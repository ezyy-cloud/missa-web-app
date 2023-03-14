import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import { useTranslation } from '../../common/components/LocalizationProvider';
import useReportStyles from '../common/useReportStyles';

const ColumnSelect = ({
  columns, setColumns, columnsArray, columnsObject,
}) => {
  const classes = useReportStyles();
  const t = useTranslation();

  return (
    <div className={classes.filterItem}>
      <FormControl fullWidth>
        <InputLabel sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedColumns')}</InputLabel>
        <Select
          label=<Typography sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedColumns')}</Typography>
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          multiple
          sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
        >
          {columnsArray
            ? columnsArray.map(([key, string]) => (
              <MenuItem key={key} value={key} style={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t(string)}</MenuItem>
            ))
            : Object.keys(columnsObject).map((key) => (
              <MenuItem key={key} value={key} style={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{columnsObject[key].name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ColumnSelect;
