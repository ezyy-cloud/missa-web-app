import React, { useState } from 'react';
import {
  Button, Dialog, Typography, DialogActions, DialogContent, FormControl, InputLabel, MenuItem, Select, TextField, Autocomplete,
} from '@mui/material';

import { createFilterOptions } from '@mui/material/useAutocomplete';
import { makeStyles } from '@mui/styles';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3),
  },
  fontStyle: {
    fontFamily: 'Gotham Rounded', fontWeight: 350,
  },
}));

const AddAttributeDialog = ({ open, onResult, definitions }) => {
  const classes = useStyles();
  const t = useTranslation();

  const filter = createFilterOptions({
    stringify: (option) => option.name,
  });

  const options = Object.entries(definitions).map(([key, value]) => ({
    key,
    name: value.name,
    type: value.type,
  }));

  const [key, setKey] = useState();
  const [type, setType] = useState('string');

  return (
    <Dialog open={open} fullWidth maxWidth="xs">
      <DialogContent className={classes.details}>
        <Autocomplete
          classes={{ listbox: classes.fontStyle, input: classes.fontStyle }}
          onChange={(_, option) => {
            setKey(option && typeof option === 'object' ? option.key : option);
            if (option && option.type) {
              setType(option.type);
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
          getOptionLabel={(option) => (option && typeof option === 'object' ? option.name : option)}
          renderOption={(props, option) => (
            <li {...props} style={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label=<Typography variant="subtitle1" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedAttribute')}</Typography>
              sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
            />
          )}
          freeSolo
        />
        <FormControl
          fullWidth
          disabled={key in definitions}
        >
          <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedType')}</InputLabel>
          <Select
            label={t('sharedType')}
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
          >
            <MenuItem value="string" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeString')}</MenuItem>
            <MenuItem value="number" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeNumber')}</MenuItem>
            <MenuItem value="boolean" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('sharedTypeBoolean')}</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={!key}
          onClick={() => onResult({ key, type })}
          sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
        >
          {t('sharedAdd')}
        </Button>
        <Button
          autoFocus
          onClick={() => onResult(null)}
          sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
        >
          {t('sharedCancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddAttributeDialog;
