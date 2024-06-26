import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';

import {
  Accordion, AccordionSummary, AccordionDetails, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from './components/EditItemView';
import EditAttributesAccordion from './components/EditAttributesAccordion';
import SelectField from '../common/components/SelectField';
import LinkField from '../common/components/LinkField';
import { useTranslation } from '../common/components/LocalizationProvider';
import SettingsMenu from './components/SettingsMenu';
import useCommonDeviceAttributes from '../common/attributes/useCommonDeviceAttributes';
import useGroupAttributes from '../common/attributes/useGroupAttributes';
import useFeatures from '../common/util/useFeatures';
import { formatNotificationTitle } from '../common/util/formatter';
import { useCatch } from '../reactHelper';
import { groupsActions } from '../store';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(3),
  },
  fontStyle: {
    fontFamily: 'Product Sans',
  },
}));

const GroupPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const commonDeviceAttributes = useCommonDeviceAttributes(t);
  const groupAttributes = useGroupAttributes(t);

  const features = useFeatures();

  const [item, setItem] = useState();

  const onItemSaved = useCatch(async () => {
    const response = await fetch('/api/groups');
    if (response.ok) {
      dispatch(groupsActions.update(await response.json()));
    } else {
      throw Error(await response.text());
    }
  });

  const validate = () => item && item.name;

  return (
    <EditItemView
      endpoint="groups"
      item={item}
      setItem={setItem}
      validate={validate}
      onItemSaved={onItemSaved}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'groupDialog']}
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
                label={t('sharedName')}
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
                label={t('groupParent')}
                sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
              />
            </AccordionDetails>
          </Accordion>
          <EditAttributesAccordion
            attributes={item.attributes}
            setAttributes={(attributes) => setItem({ ...item, attributes })}
            definitions={{ ...commonDeviceAttributes, ...groupAttributes }}
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
                  endpointLinked={`/api/geofences?groupId=${item.id}`}
                  baseId={item.id}
                  keyBase="groupId"
                  keyLink="geofenceId"
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedGeofences')}</Typography>
                />
                <LinkField
                  endpointAll="/api/notifications"
                  endpointLinked={`/api/notifications?groupId=${item.id}`}
                  baseId={item.id}
                  keyBase="groupId"
                  keyLink="notificationId"
                  titleGetter={(it) => formatNotificationTitle(t, it)}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedNotifications')}</Typography>
                />
                {!features.disableDrivers && (
                  <LinkField
                    endpointAll="/api/drivers"
                    endpointLinked={`/api/drivers?groupId=${item.id}`}
                    baseId={item.id}
                    keyBase="groupId"
                    keyLink="driverId"
                    label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedDrivers')}</Typography>
                  />
                )}
                {!features.disableComputedAttributes && (
                  <LinkField
                    endpointAll="/api/attributes/computed"
                    endpointLinked={`/api/attributes/computed?groupId=${item.id}`}
                    baseId={item.id}
                    keyBase="groupId"
                    keyLink="attributeId"
                    titleGetter={(it) => it.description}
                    label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedComputedAttributes')}</Typography>
                  />
                )}
                <LinkField
                  endpointAll="/api/commands"
                  endpointLinked={`/api/commands?groupId=${item.id}`}
                  baseId={item.id}
                  keyBase="groupId"
                  keyLink="commandId"
                  titleGetter={(it) => it.description}
                  label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedSavedCommands')}</Typography>
                />
                {!features.disableMaintenance && (
                  <LinkField
                    endpointAll="/api/maintenance"
                    endpointLinked={`/api/maintenance?groupId=${item.id}`}
                    baseId={item.id}
                    keyBase="groupId"
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

export default GroupPage;
