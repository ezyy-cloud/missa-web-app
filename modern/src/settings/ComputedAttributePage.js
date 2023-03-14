import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  createFilterOptions,
  Autocomplete,
  Button,
  Snackbar,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditItemView from './components/EditItemView';
import { useTranslation } from '../common/components/LocalizationProvider';
import usePositionAttributes from '../common/attributes/usePositionAttributes';
import SettingsMenu from './components/SettingsMenu';
import SelectField from '../common/components/SelectField';
import { useCatch } from '../reactHelper';
import { snackBarDurationLongMs } from '../common/util/duration';

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

const ComputedAttributePage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const positionAttributes = usePositionAttributes(t);

  const [item, setItem] = useState();
  const [deviceId, setDeviceId] = useState();
  const [result, setResult] = useState();

  const options = Object.entries(positionAttributes).filter(([, value]) => !value.property).map(([key, value]) => ({
    key,
    name: value.name,
    type: value.type,
  }));

  const filter = createFilterOptions({
    stringify: (option) => option.name,
  });

  const testAttribute = useCatch(async () => {
    const query = new URLSearchParams({ deviceId });
    const url = `/api/attributes/computed/test?${query.toString()}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      setResult(await response.text());
    } else {
      throw Error(await response.text());
    }
  });

  const validate = () => item && item.description && item.expression;

  return (
    <EditItemView
      endpoint="attributes/computed"
      item={item}
      setItem={setItem}
      validate={validate}
      menu={<SettingsMenu />}
      breadcrumbs={['settingsTitle', 'sharedComputedAttribute']}
    >
      {item && (
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                value={item.description || ''}
                onChange={(e) => setItem({ ...item, description: e.target.value })}
                label=<Typography sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedDescription')}</Typography>
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <Autocomplete
                classes={{ listbox: classes.fontStyle, input: classes.fontStyle }}
                value={options.find((option) => option.key === item.attribute) || item.attribute}
                onChange={(_, option) => {
                  const attribute = option ? option.key || option : null;
                  if (option && option.type) {
                    setItem({ ...item, attribute, type: option.type });
                  } else {
                    setItem({ ...item, attribute });
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  if (params.inputValue) {
                    filtered.push({
                      key: params.inputValue,
                      name: params.inputValue,
                    });
                  }
                  return filtered;
                }}
                options={options}
                getOptionLabel={(option) => option.name || option}
                renderOption={(props, option) => (
                  <li {...props} style={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedAttribute')}</Typography>
                    sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                  />
                )}
                freeSolo
              />
              <TextField
                value={item.expression || ''}
                onChange={(e) => setItem({ ...item, expression: e.target.value })}
                label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedExpression')}</Typography>
                multiline
                rows={4}
                InputProps={{
                  className: classes.fontStyle,
                }}
              />
              <FormControl disabled={item.attribute in positionAttributes}>
                <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedType')}</InputLabel>
                <Select
                  label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedType')}</Typography>
                  value={item.type || ''}
                  onChange={(e) => setItem({ ...item, type: e.target.value })}
                  sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                >
                  <MenuItem value="string" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeString')}</MenuItem>
                  <MenuItem value="number" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeNumber')}</MenuItem>
                  <MenuItem value="boolean" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeBoolean')}</MenuItem>
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                {t('sharedTest')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <SelectField
                value={deviceId || 0}
                onChange={(e) => setDeviceId(Number(e.target.value))}
                endpoint="/api/devices"
                label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedDevice')}</Typography>
                sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
              />
              <Button
                variant="outlined"
                color="primary"
                onClick={testAttribute}
                disabled={!deviceId}
                sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
              >
                {t('sharedTestExpression')}
              </Button>
              <Snackbar
                open={!!result}
                onClose={() => setResult(null)}
                autoHideDuration={snackBarDurationLongMs}
                message={result}
                sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
              />
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </EditItemView>
  );
};

export default ComputedAttributePage;
