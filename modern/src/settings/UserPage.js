import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  FormGroup,
  TextField,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import EditItemView from './components/EditItemView';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import LinkField from '../common/components/LinkField';
import { useTranslation } from '../common/components/LocalizationProvider';
import useUserAttributes from '../common/attributes/useUserAttributes';
import { sessionActions } from '../store';
import SelectField from '../common/components/SelectField';
import SettingsMenu from './components/SettingsMenu';
import useCommonUserAttributes from '../common/attributes/useCommonUserAttributes';
import { useAdministrator, useRestriction, useManager } from '../common/util/permissions';
import useQuery from '../common/util/useQuery';
import { useCatch } from '../reactHelper';
import { formatNotificationTitle } from '../common/util/formatter';
import useMapStyles from '../map/core/useMapStyles';
import { map } from '../map/core/MapView';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  fontStyle: {
    fontFamily: 'Product Sans',
    fontWeight: 350,
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();

  const admin = useAdministrator();
  const manager = useManager();
  const fixedEmail = useRestriction('fixedEmail');

  const currentUser = useSelector((state) => state.session.user);
  const registrationEnabled = useSelector((state) => state.session.server.registration);

  const mapStyles = useMapStyles();
  const commonUserAttributes = useCommonUserAttributes(t);
  const userAttributes = useUserAttributes(t);

  const { id } = useParams();
  const [item, setItem] = useState(id === currentUser.id.toString() ? currentUser : null);

  const [deleteEmail, setDeleteEmail] = useState();
  const [deleteFailed, setDeleteFailed] = useState(false);

  const handleDelete = useCatch(async () => {
    if (deleteEmail === currentUser.email) {
      setDeleteFailed(false);
      const response = await fetch(`/api/users/${currentUser.id}`, { method: 'DELETE' });
      if (response.ok) {
        navigate('/login');
        dispatch(sessionActions.updateUser(null));
      } else {
        throw Error(await response.text());
      }
    } else {
      setDeleteFailed(true);
    }
  });

  const query = useQuery();
  const [queryHandled, setQueryHandled] = useState(false);
  const attribute = query.get('attribute');

  useEffect(() => {
    if (!queryHandled && item && attribute) {
      if (!item.attributes.hasOwnProperty('attribute')) {
        const updatedAttributes = { ...item.attributes };
        updatedAttributes[attribute] = '';
        setItem({ ...item, attributes: updatedAttributes });
      }
      setQueryHandled(true);
    }
  }, [item, queryHandled, setQueryHandled, attribute]);

  const onItemSaved = (result) => {
    if (result.id === currentUser.id) {
      dispatch(sessionActions.updateUser(result));
    }
  };

  const validate = () => item && item.name && item.email && (item.id || item.password);

  return (
    <EditItemView
      endpoint="users"
      item={item}
      setItem={setItem}
      defaultItem={admin ? { deviceLimit: -1 } : {}}
      validate={validate}
      onItemSaved={onItemSaved}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'settingsUser']}
    >
      {item && (
        <>
          <Accordion defaultExpanded={!attribute}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.name || ''}
                onChange={(event) => setItem({ ...item, name: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedName')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                value={item.email || ''}
                onChange={(event) => setItem({ ...item, email: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userEmail')}</Typography>
                disabled={fixedEmail}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="password"
                onChange={(event) => setItem({ ...item, password: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userPassword')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                {t('sharedPreferences')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedPhone')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('mapDefault')}</InputLabel>
                <Select
                  label={t('mapDefault')}
                  value={item.map || 'locationIqStreets'}
                  onChange={(e) => setItem({ ...item, map: e.target.value })}
                  sx={{ fontFamily: 'Product Sans' }}
                >
                  {mapStyles.filter((style) => style.available).map((style) => (
                    <MenuItem key={style.id} value={style.id}>
                      <Typography component="span" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{style.title}</Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsCoordinateFormat')}</InputLabel>
                <Select
                  label={t('settingsCoordinateFormat')}
                  value={item.coordinateFormat || 'dd'}
                  onChange={(event) => setItem({ ...item, coordinateFormat: event.target.value })}
                  sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                >
                  <MenuItem value="dd" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDecimalDegrees')}</MenuItem>
                  <MenuItem value="ddm" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDegreesDecimalMinutes')}</MenuItem>
                  <MenuItem value="dms" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDegreesMinutesSeconds')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsSpeedUnit')}</InputLabel>
                <Select
                  label={t('settingsSpeedUnit')}
                  value={(item.attributes && item.attributes.speedUnit) || 'kn'}
                  onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, speedUnit: e.target.value } })}
                  sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                >
                  <MenuItem value="kn" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedKn')}</MenuItem>
                  <MenuItem value="kmh" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedKmh')}</MenuItem>
                  <MenuItem value="mph" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedMph')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsDistanceUnit')}</InputLabel>
                <Select
                  label={t('settingsDistanceUnit')}
                  value={(item.attributes && item.attributes.distanceUnit) || 'km'}
                  onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, distanceUnit: e.target.value } })}
                  sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                >
                  <MenuItem value="km" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedKm')}</MenuItem>
                  <MenuItem value="mi" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedMi')}</MenuItem>
                  <MenuItem value="nmi" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedNmi')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsAltitudeUnit')}</InputLabel>
                <Select
                  label={t('settingsAltitudeUnit')}
                  value={(item.attributes && item.attributes.altitudeUnit) || 'm'}
                  onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, altitudeUnit: e.target.value } })}
                  sx={{ fontFamily: 'Product Sans' }}
                >
                  <MenuItem value="m" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedMeters')}</MenuItem>
                  <MenuItem value="ft" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedFeet')}</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsVolumeUnit')}</InputLabel>
                <Select
                  label={t('settingsVolumeUnit')}
                  value={(item.attributes && item.attributes.volumeUnit) || 'ltr'}
                  onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, volumeUnit: e.target.value } })}
                  sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                >
                  <MenuItem value="ltr" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedLiter')}</MenuItem>
                  <MenuItem value="usGal" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedUsGallon')}</MenuItem>
                  <MenuItem value="impGal" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedImpGallon')}</MenuItem>
                </Select>
              </FormControl>
              <SelectField
                value={(item.attributes && item.attributes.timezone) || ''}
                emptyValue=""
                onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, timezone: e.target.value } })}
                endpoint="/api/server/timezones"
                keyGetter={(it) => it}
                titleGetter={(it) => it}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedTimezone')}</Typography>
                sx={{ fontFamily: 'Product Sans' }}
              />
              <TextField
                value={item.poiLayer || ''}
                onChange={(event) => setItem({ ...item, poiLayer: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('mapPoiLayer')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={item.twelveHourFormat} onChange={(event) => setItem({ ...item, twelveHourFormat: event.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsTwelveHourFormat')}</Typography>
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                {t('sharedLocation')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                type="number"
                value={item.latitude || 0}
                onChange={(event) => setItem({ ...item, latitude: Number(event.target.value) })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('positionLatitude')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="number"
                value={item.longitude || 0}
                onChange={(event) => setItem({ ...item, longitude: Number(event.target.value) })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('positionLongitude')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="number"
                value={item.zoom || 0}
                onChange={(event) => setItem({ ...item, zoom: Number(event.target.value) })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('serverZoom')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <Button
                variant="outlined"
                color="primary"
                sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                onClick={() => {
                  const { lng, lat } = map.getCenter();
                  setItem({
                    ...item,
                    latitude: Number(lat.toFixed(6)),
                    longitude: Number(lng.toFixed(6)),
                    zoom: Number(map.getZoom().toFixed(1)),
                  });
                }}
              >
                {t('mapCurrentLocation')}
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                {t('sharedPermissions')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userExpirationTime')}</Typography>
                type="date"
                value={(item.expirationTime && moment(item.expirationTime).locale('en').format(moment.HTML5_FMT.DATE)) || '2099-01-01'}
                onChange={(e) => setItem({ ...item, expirationTime: moment(e.target.value, moment.HTML5_FMT.DATE).locale('en').format() })}
                disabled={!manager}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="number"
                value={item.deviceLimit || 0}
                onChange={(e) => setItem({ ...item, deviceLimit: Number(e.target.value) })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userDeviceLimit')}</Typography>
                disabled={!admin}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="number"
                value={item.userLimit || 0}
                onChange={(e) => setItem({ ...item, userLimit: Number(e.target.value) })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userUserLimit')}</Typography>
                disabled={!admin}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={item.disabled} onChange={(e) => setItem({ ...item, disabled: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDisabled')}</Typography>
                  disabled={!manager}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.administrator} onChange={(e) => setItem({ ...item, administrator: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userAdmin')}</Typography>
                  disabled={!admin}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.readonly} onChange={(e) => setItem({ ...item, readonly: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('serverReadonly')}</Typography>
                  disabled={!manager}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.deviceReadonly} onChange={(e) => setItem({ ...item, deviceReadonly: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userDeviceReadonly')}</Typography>
                  disabled={!manager}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.limitCommands} onChange={(e) => setItem({ ...item, limitCommands: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userLimitCommands')}</Typography>
                  disabled={!manager}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.disableReports} onChange={(e) => setItem({ ...item, disableReports: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userDisableReports')}</Typography>
                  disabled={!manager}
                />
                <FormControlLabel
                  control={<Checkbox checked={item.fixedEmail} onChange={(e) => setItem({ ...item, fixedEmail: e.target.checked })} />}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userFixedEmail')}</Typography>
                  disabled={!manager}
                />
              </FormGroup>
            </AccordionDetails>
          </Accordion>
          <EditAttributesAccordion
            attribute={attribute}
            attributes={item.attributes}
            setAttributes={(attributes) => setItem({ ...item, attributes })}
            definitions={{ ...commonUserAttributes, ...userAttributes }}
            focusAttribute={attribute}
          />
          {registrationEnabled && item.id === currentUser.id && !manager && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" color="error" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                  {t('userDeleteAccount')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <TextField
                  value={deleteEmail}
                  onChange={(event) => setDeleteEmail(event.target.value)}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userEmail')}</Typography>
                  error={deleteFailed}
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDelete}
                  startIcon={<DeleteForeverIcon />}
                  sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
                >
                  {t('userDeleteAccount')}
                </Button>
              </AccordionDetails>
            </Accordion>
          )}
          {item.id && manager && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                  {t('sharedConnections')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  endpointAll="/api/devices?all=true"
                  endpointLinked={`/api/devices?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="deviceId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceTitle')}</Typography>
                />
                <LinkField
                  endpointAll="/api/groups?all=true"
                  endpointLinked={`/api/groups?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="groupId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsGroups')}</Typography>
                />
                <LinkField
                  endpointAll="/api/geofences?all=true"
                  endpointLinked={`/api/geofences?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="geofenceId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedGeofences')}</Typography>
                />
                <LinkField
                  endpointAll="/api/notifications?all=true"
                  endpointLinked={`/api/notifications?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="notificationId"
                  titleGetter={(it) => formatNotificationTitle(t, it, true)}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedNotifications')}</Typography>
                />
                <LinkField
                  endpointAll="/api/calendars?all=true"
                  endpointLinked={`/api/calendars?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="calendarId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedCalendars')}</Typography>
                />
                <LinkField
                  endpointAll="/api/users?all=true"
                  endpointLinked={`/api/users?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="managedUserId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsUsers')}</Typography>
                />
                <LinkField
                  endpointAll="/api/attributes/computed?all=true"
                  endpointLinked={`/api/attributes/computed?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="attributeId"
                  titleGetter={(it) => it.description}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedComputedAttributes')}</Typography>
                />
                <LinkField
                  endpointAll="/api/drivers?all=true"
                  endpointLinked={`/api/drivers?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="driverId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDrivers')}</Typography>
                />
                <LinkField
                  endpointAll="/api/commands?all=true"
                  endpointLinked={`/api/commands?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="commandId"
                  titleGetter={(it) => it.description}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedSavedCommands')}</Typography>
                />
                <LinkField
                  endpointAll="/api/maintenance?all=true"
                  endpointLinked={`/api/maintenance?userId=${item.id}`}
                  baseId={item.id}
                  keyBase="userId"
                  keyLink="maintenanceId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedMaintenance')}</Typography>
                />
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </EditItemView>
  );
};

export default UserPage;
