import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useEffectAsync } from '../../reactHelper';

const SelectField = ({
  label,
  multiple,
  value,
  emptyValue = 0,
  emptyTitle = '\u00a0',
  onChange,
  endpoint,
  data,
  keyGetter = (item) => item.id,
  titleGetter = (item) => item.name,
}) => {
  const [items, setItems] = useState(data);

  useEffectAsync(async () => {
    if (endpoint) {
      const response = await fetch(endpoint);
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    }
  }, []);

  if (items) {
    return (
      <FormControl>
        <InputLabel><Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{label}</Typography></InputLabel>
        <Select
          label={label}
          multiple={multiple}
          value={value}
          onChange={onChange}
        >
          {!multiple && emptyValue !== null && (
            <MenuItem value={emptyValue}><Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{emptyTitle}</Typography></MenuItem>
          )}
          {items.map((item) => (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}><Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{titleGetter(item)}</Typography></MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
  return null;
};

export default SelectField;
