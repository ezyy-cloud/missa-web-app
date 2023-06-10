import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Toolbar, IconButton, OutlinedInput, InputAdornment, Popover, FormControl, InputLabel, Select, MenuItem, FormGroup, FormControlLabel, Checkbox, Badge, ListItemButton, ListItemText, Typography,
} from '@mui/material';
import { makeStyles, useTheme } from '@mui/styles';
import MapIcon from '@mui/icons-material/Map';
import ViewListIcon from '@mui/icons-material/ViewList';
import AddIcon from '@mui/icons-material/Add';
import TuneIcon from '@mui/icons-material/Tune';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useDeviceReadonly } from '../common/util/permissions';
import DeviceRow from './DeviceRow';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    gap: theme.spacing(1),
    backgroundColor: theme.palette.colors.primary,
  },
  filterPanel: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    width: theme.dimensions.drawerWidthTablet,
    background: theme.palette.colors.background,
  },
  icon: {
    backgroundColor: theme.palette.colors.secondary,
  },
  filter: {
    backgroundColor: theme.palette.colors.backgground,
    fontFamily: 'Product Sans',
    fontWeight: 350,
  },
}));

const MainToolbar = ({
  filteredDevices,
  devicesOpen,
  setDevicesOpen,
  keyword,
  setKeyword,
  filter,
  setFilter,
  filterSort,
  setFilterSort,
  filterMap,
  setFilterMap,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const t = useTranslation();

  const deviceReadonly = useDeviceReadonly();

  const groups = useSelector((state) => state.groups.items);
  const devices = useSelector((state) => state.devices.items);

  const toolbarRef = useRef();
  const inputRef = useRef();
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [devicesAnchorEl, setDevicesAnchorEl] = useState(null);

  const deviceStatusCount = (status) => Object.values(devices).filter((d) => d.status === status).length;

  return (
    <Toolbar ref={toolbarRef} className={classes.toolbar}>
      <IconButton edge="start" onClick={() => setDevicesOpen(!devicesOpen)} className={classes.icon}>
        {devicesOpen ? <MapIcon /> : <ViewListIcon />}
      </IconButton>
      <OutlinedInput
        ref={inputRef}
        className={classes.filter}
        placeholder={t('sharedSearchDevices')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setDevicesAnchorEl(toolbarRef.current)}
        onBlur={() => setDevicesAnchorEl(null)}
        endAdornment={(
          <InputAdornment position="end">
            <IconButton size="small" edge="end" onClick={() => setFilterAnchorEl(inputRef.current)}>
              <Badge color="info" variant="dot" invisible={!filter.statuses.length && !filter.groups.length}>
                <TuneIcon fontSize="small" />
              </Badge>
            </IconButton>
          </InputAdornment>
        )}
        size="small"
        fullWidth
      />
      <Popover
        open={!!devicesAnchorEl && !devicesOpen}
        anchorEl={devicesAnchorEl}
        onClose={() => setDevicesAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: Number(theme.spacing(2).slice(0, -2)),
        }}
        marginThreshold={0}
        PaperProps={{
          style: { width: `calc(${toolbarRef.current?.clientWidth}px - ${theme.spacing(4)})` },
        }}
        elevation={1}
        disableAutoFocus
        disableEnforceFocus
      >
        {filteredDevices.slice(0, 3).map((_, index) => (
          <DeviceRow key={filteredDevices[index].id} data={filteredDevices} index={index} />
        ))}
        {filteredDevices.length > 3 && (
          <ListItemButton alignItems="center" onClick={() => setDevicesOpen(true)}>
            <ListItemText
              primary=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('notificationAlways')}</Typography>
              style={{ textAlign: 'center' }}
            />
          </ListItemButton>
        )}
      </Popover>
      <Popover
        open={!!filterAnchorEl}
        anchorEl={filterAnchorEl}
        onClose={() => setFilterAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div className={classes.filterPanel}>
          <FormControl>
            <InputLabel><Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceStatus')}</Typography></InputLabel>
            <Select
              label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceStatus')}</Typography>
              value={filter.statuses}
              onChange={(e) => setFilter({ ...filter, statuses: e.target.value })}
              multiple
            >
              <MenuItem value="online" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{`${t('deviceStatusOnline')} (${deviceStatusCount('online')})`}</MenuItem>
              <MenuItem value="offline" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{`${t('deviceStatusOffline')} (${deviceStatusCount('offline')})`}</MenuItem>
              <MenuItem value="unknown" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{`${t('deviceStatusUnknown')} (${deviceStatusCount('unknown')})`}</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsGroups')}</InputLabel>
            <Select
              label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('settingsGroups')}</Typography>
              value={filter.groups}
              onChange={(e) => setFilter({ ...filter, groups: e.target.value })}
              multiple
            >
              {Object.values(groups).sort((a, b) => a.name.localeCompare(b.name)).map((group) => (
                <MenuItem key={group.id} value={group.id}><Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{group.name}</Typography></MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel><Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedSortBy')}</Typography></InputLabel>
            <Select
              label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedSortBy')}</Typography>
              value={filterSort}
              onChange={(e) => setFilterSort(e.target.value)}
              displayEmpty
            >
              <MenuItem value="" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{'\u00a0'}</MenuItem>
              <MenuItem value="name" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedName')}</MenuItem>
              <MenuItem value="lastUpdate" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('deviceLastUpdate')}</MenuItem>
            </Select>
          </FormControl>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={filterMap} onChange={(e) => setFilterMap(e.target.checked)} />}
              label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedFilterMap')}</Typography>
            />
          </FormGroup>
        </div>
      </Popover>
      <IconButton edge="end" onClick={() => navigate('/settings/device')} disabled={deviceReadonly} className={classes.icon}>
        <AddIcon />
      </IconButton>
    </Toolbar>
  );
};

export default MainToolbar;
