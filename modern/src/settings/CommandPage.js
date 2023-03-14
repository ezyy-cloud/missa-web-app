import React, { useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails, Typography, TextField,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from './components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';
import BaseCommandView from './components/BaseCommandView';
import SettingsMenu from './components/SettingsMenu';

const useStyles = makeStyles((theme) => ({
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

const CommandPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [item, setItem] = useState();

  const validate = () => item && item.type;

  return (
    <EditItemView
      endpoint="commands"
      item={item}
      setItem={setItem}
      validate={validate}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'sharedSavedCommand']}
    >
      {item && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
              {t('sharedRequired')}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <TextField
              value={item.description || ''}
              onChange={(event) => setItem({ ...item, description: event.target.value })}
              label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedDescription')}</Typography>
              InputProps={{
                className: classes.fontStyle,
              }}
            />
            <BaseCommandView item={item} setItem={setItem} />
          </AccordionDetails>
        </Accordion>
      )}
    </EditItemView>
  );
};

export default CommandPage;
