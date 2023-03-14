import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  FormControl,
  Container,
  Checkbox,
  FormControlLabel,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions } from '../store';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import { useTranslation } from '../common/components/LocalizationProvider';
import SelectField from '../common/components/SelectField';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import useCommonDeviceAttributes from '../common/attributes/useCommonDeviceAttributes';
import useCommonUserAttributes from '../common/attributes/useCommonUserAttributes';
import { useCatch } from '../reactHelper';
import useServerAttributes from '../common/attributes/useServerAttributes';
import useMapStyles from '../map/core/useMapStyles';
import { map } from '../map/core/MapView';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  fontStyle: {
    fontFamily: 'Gotham Rounded', fontWeight: 350,
  },
}));

const ServerPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const t = useTranslation();

  const mapStyles = useMapStyles();
  const commonUserAttributes = useCommonUserAttributes(t);
  const commonDeviceAttributes = useCommonDeviceAttributes(t);
  const serverAttributes = useServerAttributes(t);

  const original = useSelector((state) => state.session.server);
  const [item, setItem] = useState({ ...original });

  const handleSave = useCatch(async () => {
    const response = await fetch('/api/server', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      dispatch(sessionActions.updateServer(await response.json()));
      navigate(-1);
    } else {
      throw Error(await response.text());
    }
  });

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'settingsServer']}>
      <Container maxWidth="xs" className={classes.container}>
        {item && (
          <>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                  {t('sharedPreferences')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <TextField
                  value={item.mapUrl || ''}
                  onChange={(event) => setItem({ ...item, mapUrl: event.target.value })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('mapCustomLabel')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <TextField
                  value={item.overlayUrl || ''}
                  onChange={(event) => setItem({ ...item, overlayUrl: event.target.value })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('mapOverlayCustom')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('mapDefault')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('mapDefault')}</Typography>
                    value={item.map || 'locationIqStreets'}
                    onChange={(e) => setItem({ ...item, map: e.target.value })}
                    sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                  >
                    {mapStyles.filter((style) => style.available).map((style) => (
                      <MenuItem key={style.id} value={style.id}>
                        <Typography component="span" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{style.title}</Typography>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsCoordinateFormat')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsCoordinateFormat')}</Typography>
                    value={item.coordinateFormat || 'dd'}
                    onChange={(event) => setItem({ ...item, coordinateFormat: event.target.value })}
                    sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                  >
                    <MenuItem value="dd" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedDecimalDegrees')}</MenuItem>
                    <MenuItem value="ddm" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedDegreesDecimalMinutes')}</MenuItem>
                    <MenuItem value="dms" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedDegreesMinutesSeconds')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsSpeedUnit')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsSpeedUnit')}</Typography>
                    value={item.attributes.speedUnit || 'kn'}
                    sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                    onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, speedUnit: e.target.value } })}
                  >
                    <MenuItem value="kn" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedKn')}</MenuItem>
                    <MenuItem value="kmh" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedKmh')}</MenuItem>
                    <MenuItem value="mph" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedMph')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsDistanceUnit')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsDistanceUnit')}</Typography>
                    sx={{ fontFamily: 'Gotham Rounded' }}
                    value={item.attributes.distanceUnit || 'km'}
                    onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, distanceUnit: e.target.value } })}
                  >
                    <MenuItem value="km" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedKm')}</MenuItem>
                    <MenuItem value="mi" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedMi')}</MenuItem>
                    <MenuItem value="nmi" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedNmi')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsAltitudeUnit')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsAltitudeUnit')}</Typography>
                    value={item.attributes.altitudeUnit || 'm'}
                    sx={{ fontFamily: 'Gotham Rounded' }}
                    onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, altitudeUnit: e.target.value } })}
                  >
                    <MenuItem value="m" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedMeters')}</MenuItem>
                    <MenuItem value="ft" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedFeet')}</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsVolumeUnit')}</InputLabel>
                  <Select
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsVolumeUnit')}</Typography>
                    value={item.attributes.volumeUnit || 'ltr'}
                    sx={{ fontFamily: 'Gotham Rounded' }}
                    onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, volumeUnit: e.target.value } })}
                  >
                    <MenuItem value="ltr" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedLiter')}</MenuItem>
                    <MenuItem value="usGal" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedUsGallon')}</MenuItem>
                    <MenuItem value="impGal" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedImpGallon')}</MenuItem>
                  </Select>
                </FormControl>
                <SelectField
                  value={item.attributes.timezone || ''}
                  emptyValue=""
                  onChange={(e) => setItem({ ...item, attributes: { ...item.attributes, timezone: e.target.value } })}
                  endpoint="/api/server/timezones"
                  keyGetter={(it) => it}
                  titleGetter={(it) => it}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTimezone')}</Typography>
                  sx={{ fontFamily: 'Gotham Rounded' }}
                />
                <TextField
                  value={item.poiLayer || ''}
                  onChange={(event) => setItem({ ...item, poiLayer: event.target.value })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('mapPoiLayer')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <TextField
                  value={item.announcement || ''}
                  onChange={(event) => setItem({ ...item, announcement: event.target.value })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('serverAnnouncement')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={item.twelveHourFormat} onChange={(event) => setItem({ ...item, twelveHourFormat: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsTwelveHourFormat')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.forceSettings} onChange={(event) => setItem({ ...item, forceSettings: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('serverForceSettings')}</Typography>
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                  {t('sharedLocation')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <TextField
                  type="number"
                  value={item.latitude || 0}
                  onChange={(event) => setItem({ ...item, latitude: Number(event.target.value) })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('positionLatitude')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <TextField
                  type="number"
                  value={item.longitude || 0}
                  onChange={(event) => setItem({ ...item, longitude: Number(event.target.value) })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('positionLongitude')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <TextField
                  type="number"
                  value={item.zoom || 0}
                  onChange={(event) => setItem({ ...item, zoom: Number(event.target.value) })}
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('serverZoom')}</Typography>
                  InputProps={{
                    className: classes.fontStyle,
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    const { lng, lat } = map.getCenter();
                    setItem({
                      ...item,
                      latitude: Number(lat.toFixed(6)),
                      longitude: Number(lng.toFixed(6)),
                      zoom: Number(map.getZoom().toFixed(1)),
                    });
                  }}
                  sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                >
                  {t('mapCurrentLocation')}
                </Button>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                  {t('sharedPermissions')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={item.registration} onChange={(event) => setItem({ ...item, registration: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('serverRegistration')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.readonly} onChange={(event) => setItem({ ...item, readonly: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('serverReadonly')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.deviceReadonly} onChange={(event) => setItem({ ...item, deviceReadonly: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userDeviceReadonly')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.limitCommands} onChange={(event) => setItem({ ...item, limitCommands: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userLimitCommands')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.disableReports} onChange={(event) => setItem({ ...item, disableReports: event.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userDisableReports')}</Typography>
                  />
                  <FormControlLabel
                    control={<Checkbox checked={item.fixedEmail} onChange={(e) => setItem({ ...item, fixedEmail: e.target.checked })} />}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userFixedEmail')}</Typography>
                  />
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            <EditAttributesAccordion
              attributes={item.attributes}
              setAttributes={(attributes) => setItem({ ...item, attributes })}
              definitions={{ ...commonUserAttributes, ...commonDeviceAttributes, ...serverAttributes }}
            />
          </>
        )}
        <div className={classes.buttons}>
          <Button type="button" color="primary" variant="outlined" onClick={() => navigate(-1)} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
            {t('sharedCancel')}
          </Button>
          <Button type="button" color="primary" variant="contained" onClick={handleSave} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
            {t('sharedSave')}
          </Button>
        </div>
      </Container>
    </PageLayout>
  );
};

export default ServerPage;
