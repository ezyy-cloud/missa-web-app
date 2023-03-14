import React from 'react';
import {
  FormControl, InputLabel, Select, MenuItem, Button, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from '../../common/components/LocalizationProvider';
import useReportStyles from '../common/useReportStyles';
import { reportsActions } from '../../store';

const ReportFilter = ({ children, handleSubmit, showOnly, ignoreDevice, multiDevice, includeGroups }) => {
  const classes = useReportStyles();
  const dispatch = useDispatch();
  const t = useTranslation();

  const devices = useSelector((state) => state.devices.items);
  const groups = useSelector((state) => state.groups.items);
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);

  const deviceId = useSelector((state) => state.reports.deviceId || selectedDeviceId);
  const deviceIds = useSelector((state) => (
    state.reports.deviceIds.length
      ? state.reports.deviceIds : state.reports.deviceId
        ? [state.reports.deviceId] : selectedDeviceId
          ? [selectedDeviceId] : []
  ));
  const groupIds = useSelector((state) => state.reports.groupIds);
  const period = useSelector((state) => state.reports.period);
  const from = useSelector((state) => state.reports.from);
  const to = useSelector((state) => state.reports.to);

  const disabled = !ignoreDevice && !selectedDeviceId && !deviceId && !deviceIds.length && !groupIds.length;

  const handleClick = (type) => {
    let selectedFrom;
    let selectedTo;
    switch (period) {
      case 'today':
        selectedFrom = moment().startOf('day');
        selectedTo = moment().endOf('day');
        break;
      case 'yesterday':
        selectedFrom = moment().subtract(1, 'day').startOf('day');
        selectedTo = moment().subtract(1, 'day').endOf('day');
        break;
      case 'thisWeek':
        selectedFrom = moment().startOf('week');
        selectedTo = moment().endOf('week');
        break;
      case 'previousWeek':
        selectedFrom = moment().subtract(1, 'week').startOf('week');
        selectedTo = moment().subtract(1, 'week').endOf('week');
        break;
      case 'thisMonth':
        selectedFrom = moment().startOf('month');
        selectedTo = moment().endOf('month');
        break;
      case 'previousMonth':
        selectedFrom = moment().subtract(1, 'month').startOf('month');
        selectedTo = moment().subtract(1, 'month').endOf('month');
        break;
      default:
        selectedFrom = moment(from, moment.HTML5_FMT.DATETIME_LOCAL);
        selectedTo = moment(to, moment.HTML5_FMT.DATETIME_LOCAL);
        break;
    }

    handleSubmit({
      deviceId,
      deviceIds,
      groupIds,
      from: selectedFrom.toISOString(),
      to: selectedTo.toISOString(),
      type,
    });
  };

  return (
    <div className={classes.filter}>
      {!ignoreDevice && (
        <div className={classes.filterItem}>
          <FormControl fullWidth>
            <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t(multiDevice ? 'deviceTitle' : 'reportDevice')}</InputLabel>
            <Select
              label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t(multiDevice ? 'deviceTitle' : 'reportDevice')}</Typography>
              value={multiDevice ? deviceIds : deviceId || ''}
              onChange={(e) => dispatch(multiDevice ? reportsActions.updateDeviceIds(e.target.value) : reportsActions.updateDeviceId(e.target.value))}
              multiple={multiDevice}
            >
              {Object.values(devices).sort((a, b) => a.name.localeCompare(b.name)).map((device) => (
                <MenuItem key={device.id} value={device.id} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{device.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      {includeGroups && (
        <div className={classes.filterItem}>
          <FormControl fullWidth>
            <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsGroups')}</InputLabel>
            <Select
              label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('settingsGroups')}</Typography>
              value={groupIds}
              onChange={(e) => dispatch(reportsActions.updateGroupIds(e.target.value))}
              multiple
            >
              {Object.values(groups).sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
                <MenuItem key={group.id} value={group.id} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{group.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}
      <div className={classes.filterItem}>
        <FormControl fullWidth>
          <InputLabel sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportPeriod')}</InputLabel>
          <Select label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportPeriod')}</Typography> value={period} onChange={(e) => dispatch(reportsActions.updatePeriod(e.target.value))}>
            <MenuItem value="today" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportToday')}</MenuItem>
            <MenuItem value="yesterday" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportYesterday')}</MenuItem>
            <MenuItem value="thisWeek" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportThisWeek')}</MenuItem>
            <MenuItem value="previousWeek" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportPreviousWeek')}</MenuItem>
            <MenuItem value="thisMonth" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportThisMonth')}</MenuItem>
            <MenuItem value="previousMonth" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportPreviousMonth')}</MenuItem>
            <MenuItem value="custom" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportCustom')}</MenuItem>
          </Select>
        </FormControl>
      </div>
      {period === 'custom' && (
        <div className={classes.filterItem}>
          <TextField
            label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportFrom')}</Typography>
            type="datetime-local"
            value={from}
            onChange={(e) => dispatch(reportsActions.updateFrom(e.target.value))}
            fullWidth
            InputProps={{
              className: classes.fontStyle,
            }}
          />
        </div>
      )}
      {period === 'custom' && (
        <div className={classes.filterItem}>
          <TextField
            label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('reportTo')}</Typography>
            type="datetime-local"
            value={to}
            onChange={(e) => dispatch(reportsActions.updateTo(e.target.value))}
            fullWidth
            InputProps={{
              className: classes.fontStyle,
            }}
          />
        </div>
      )}
      {children}
      <div className={classes.filterButtons}>
        <Button
          onClick={() => handleClick('json')}
          variant="outlined"
          color="secondary"
          className={classes.filterButton}
          disabled={disabled}
          sx={{ fontFamily: 'Gotham Rounded' }}
        >
          {t('reportShow')}
        </Button>
        {!showOnly && (
          <Button
            onClick={() => handleClick('export')}
            variant="outlined"
            color="secondary"
            className={classes.filterButton}
            disabled={disabled}
            sx={{ fontFamily: 'Gotham Rounded' }}
          >
            {t('reportExport')}
          </Button>
        )}
        {!showOnly && (
          <Button
            onClick={() => handleClick('mail')}
            variant="outlined"
            color="secondary"
            className={classes.filterButton}
            disabled={disabled}
            sx={{ fontFamily: 'Gotham Rounded' }}
          >
            <Typography
              variant="button"
              noWrap
              sx={{ fontFamily: 'Gotham Rounded' }}
            >
              {t('reportEmail')}
            </Typography>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ReportFilter;
