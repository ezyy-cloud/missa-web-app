import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
  TextField,
  Button,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import { useCatch } from '../reactHelper';
import { useAttributePreference } from '../common/util/preferences';
import { distanceFromMeters, distanceToMeters, distanceUnitString } from '../common/util/converter';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  fontStyle: {
    fontFamily: 'Gotham Rounded', fontWeight: 350,
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
}));

const AccumulatorsPage = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const t = useTranslation();

  const distanceUnit = useAttributePreference('distanceUnit');

  const { deviceId } = useParams();
  const position = useSelector((state) => state.session.positions[deviceId]);

  const [item, setItem] = useState();

  useEffect(() => {
    if (position) {
      setItem({
        deviceId: parseInt(deviceId, 10),
        hours: position.attributes.hours || 0,
        totalDistance: position.attributes.totalDistance || 0,
      });
    }
  }, [deviceId, position]);

  const handleSave = useCatch(async () => {
    const response = await fetch(`/api/devices/${deviceId}/accumulators`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });

    if (response.ok) {
      navigate(-1);
    } else {
      throw Error(await response.text());
    }
  });

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['sharedDeviceAccumulators']}>
      {item && (
        <Container maxWidth="xs" className={classes.container}>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                type="number"
                value={item.hours / 3600000}
                onChange={(event) => setItem({ ...item, hours: Number(event.target.value) * 3600000 })}
                label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('positionHours')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <TextField
                type="number"
                value={distanceFromMeters(item.totalDistance, distanceUnit)}
                onChange={(event) => setItem({ ...item, totalDistance: distanceToMeters(Number(event.target.value), distanceUnit) })}
                label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{`${t('deviceTotalDistance')} (${distanceUnitString(distanceUnit, t)})`}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
            </AccordionDetails>
          </Accordion>
          <div className={classes.buttons}>
            <Button
              type="button"
              color="primary"
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{ fontFamily: 'Gotham Rounded' }}
            >
              {t('sharedCancel')}
            </Button>
            <Button
              type="button"
              color="primary"
              variant="contained"
              onClick={handleSave}
              sx={{ fontFamily: 'Gotham Rounded' }}
            >
              {t('sharedSave')}
            </Button>
          </div>
        </Container>
      )}
    </PageLayout>
  );
};

export default AccumulatorsPage;
