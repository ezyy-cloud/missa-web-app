import React, { useState } from 'react';
import moment from 'moment';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DropzoneArea } from 'react-mui-dropzone';
import EditItemView from './components/EditItemView';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import SelectField from '../common/components/SelectField';
import deviceCategories from '../common/util/deviceCategories';
import LinkField from '../common/components/LinkField';
import { useTranslation } from '../common/components/LocalizationProvider';
import useDeviceAttributes from '../common/attributes/useDeviceAttributes';
import { useAdministrator } from '../common/util/permissions';
import SettingsMenu from './components/SettingsMenu';
import useCommonDeviceAttributes from '../common/attributes/useCommonDeviceAttributes';
import useFeatures from '../common/util/useFeatures';
import { useCatch } from '../reactHelper';
import { formatNotificationTitle } from '../common/util/formatter';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  fontStyle: {
    fontFamily: 'Product Sans', fontWeight: 350,
  },
}));

const DevicePage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const admin = useAdministrator();

  const commonDeviceAttributes = useCommonDeviceAttributes(t);
  const deviceAttributes = useDeviceAttributes(t);

  const features = useFeatures();

  const [item, setItem] = useState();

  const handleFiles = useCatch(async (files) => {
    if (files.length > 0) {
      const response = await fetch(`/api/devices/${item.id}/image`, {
        method: 'POST',
        body: files[0],
      });
      if (response.ok) {
        setItem({ ...item, attributes: { ...item.attributes, deviceImage: await response.text() } });
      } else {
        throw Error(await response.text());
      }
    }
  });

  const validate = () => item && item.name && item.uniqueId;

  return (
    <EditItemView
      endpoint="devices"
      item={item}
      setItem={setItem}
      validate={validate}
      menu={<SettingsMenu />}
      breadcrumbs={['sharedDevice']}
    >
      {item && (
        <>
          <Accordion defaultExpanded>
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
                value={item.uniqueId || ''}
                onChange={(event) => setItem({ ...item, uniqueId: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceIdentifier')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                {t('sharedExtra')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <SelectField
                value={item.groupId || 0}
                onChange={(event) => setItem({ ...item, groupId: Number(event.target.value) })}
                endpoint="/api/groups"
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('groupParent')}</Typography>
              />
              <TextField
                value={item.phone || ''}
                onChange={(event) => setItem({ ...item, phone: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedPhone')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                value={item.model || ''}
                onChange={(event) => setItem({ ...item, model: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceModel')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                value={item.contact || ''}
                onChange={(event) => setItem({ ...item, contact: event.target.value })}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceContact')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <SelectField
                value={item.category || 'default'}
                emptyValue={null}
                onChange={(event) => setItem({ ...item, category: event.target.value })}
                data={deviceCategories.map((category) => ({
                  id: category,
                  name: t(`category${category.replace(/^\w/, (c) => c.toUpperCase())}`),
                }))}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceCategory')}</Typography>
              />
              <TextField
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('userExpirationTime')}</Typography>
                type="date"
                value={(item.expirationTime && moment(item.expirationTime).locale('en').format(moment.HTML5_FMT.DATE)) || '2099-01-01'}
                onChange={(e) => setItem({ ...item, expirationTime: moment(e.target.value, moment.HTML5_FMT.DATE).locale('en').format() })}
                disabled={!admin}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={item.disabled} onChange={(event) => setItem({ ...item, disabled: event.target.checked })} />}
                label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDisabled')}</Typography>
                disabled={!admin}
              />
            </AccordionDetails>
          </Accordion>
          {item.id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                  {t('attributeDeviceImage')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <DropzoneArea
                  dropzoneText={t('sharedDropzoneText')}
                  acceptedFiles={['image/*']}
                  filesLimit={1}
                  onChange={handleFiles}
                  showAlerts={false}
                />
              </AccordionDetails>
            </Accordion>
          )}
          <EditAttributesAccordion
            attributes={item.attributes}
            setAttributes={(attributes) => setItem({ ...item, attributes })}
            definitions={{ ...commonDeviceAttributes, ...deviceAttributes }}
          />
          {item.id && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
                  {t('sharedConnections')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  endpointAll="/api/geofences"
                  endpointLinked={`/api/geofences?deviceId=${item.id}`}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="geofenceId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedGeofences')}</Typography>
                />
                <LinkField
                  endpointAll="/api/notifications"
                  endpointLinked={`/api/notifications?deviceId=${item.id}`}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="notificationId"
                  titleGetter={(it) => formatNotificationTitle(t, it)}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedNotifications')}</Typography>
                />
                {!features.disableDrivers && (
                  <LinkField
                    endpointAll="/api/drivers"
                    endpointLinked={`/api/drivers?deviceId=${item.id}`}
                    baseId={item.id}
                    keyBase="deviceId"
                    keyLink="driverId"
                    label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDrivers')}</Typography>
                  />
                )}
                {!features.disableComputedAttributes && (
                  <LinkField
                    endpointAll="/api/attributes/computed"
                    endpointLinked={`/api/attributes/computed?deviceId=${item.id}`}
                    baseId={item.id}
                    keyBase="deviceId"
                    keyLink="attributeId"
                    titleGetter={(it) => it.description}
                    label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedComputedAttributes')}</Typography>
                  />
                )}
                <LinkField
                  endpointAll="/api/commands"
                  endpointLinked={`/api/commands?deviceId=${item.id}`}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="commandId"
                  titleGetter={(it) => it.description}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedSavedCommands')}</Typography>
                />
                {!features.disableMaintenance && (
                  <LinkField
                    endpointAll="/api/maintenance"
                    endpointLinked={`/api/maintenance?deviceId=${item.id}`}
                    baseId={item.id}
                    keyBase="deviceId"
                    keyLink="maintenanceId"
                    label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedMaintenance')}</Typography>
                  />
                )}
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </EditItemView>
  );
};

export default DevicePage;
