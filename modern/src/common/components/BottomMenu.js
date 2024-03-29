import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Paper, BottomNavigation, BottomNavigationAction, Menu, MenuItem, Typography, Badge,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import { makeStyles } from '@mui/styles';
import { sessionActions } from '../../store';
import { useTranslation } from './LocalizationProvider';
import { useRestriction } from '../util/permissions';
import { nativePostMessage } from './NativeInterface';

const useStyles = makeStyles((theme) => ({
  bottomNav: {
    backgroundColor: theme.palette.colors.primary,
  },
  bottomNavAction: {
    color: theme.palette.colors.background,
    '&.Mui-selected': {
      color: theme.palette.colors.secondary,
    },
  },
}));

const BottomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const t = useTranslation();
  const classes = useStyles();

  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const user = useSelector((state) => state.session.user);
  const socket = useSelector((state) => state.session.socket);

  const [anchorEl, setAnchorEl] = useState(null);

  const currentSelection = () => {
    if (location.pathname === `/settings/user/${user.id}`) {
      return 'account';
    } if (location.pathname.startsWith('/settings')) {
      return 'settings';
    } if (location.pathname.startsWith('/reports')) {
      return 'reports';
    } if (location.pathname === '/') {
      return 'map';
    }
    return null;
  };

  const handleAccount = () => {
    setAnchorEl(null);
    navigate(`/settings/user/${user.id}`);
  };

  const handleLogout = async () => {
    setAnchorEl(null);

    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  const handleSelection = (event, value) => {
    switch (value) {
      case 'map':
        navigate('/');
        break;
      case 'reports':
        navigate('/reports/route');
        break;
      case 'settings':
        navigate('/settings/preferences');
        break;
      case 'account':
        setAnchorEl(event.currentTarget);
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  return (
    <Paper square elevation={3}>
      <BottomNavigation value={currentSelection()} onChange={handleSelection} className={classes.bottomNav} showLabels>
        <BottomNavigationAction
          label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350, fontSize: '12px' }}>{t('mapTitle')}</Typography>
          className={classes.bottomNavAction}
          icon={(
            <Badge color="error" variant="dot" overlap="circular" invisible={socket !== false}>
              <MapIcon />
            </Badge>
          )}
          value="map"
        />
        {!disableReports && (
          <BottomNavigationAction label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350, fontSize: '12px' }}>{t('reportTitle')}</Typography> className={classes.bottomNavAction} icon={<DescriptionIcon />} value="reports" />
        )}
        <BottomNavigationAction label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350, fontSize: '12px' }}>{t('settingsTitle')}</Typography> className={classes.bottomNavAction} icon={<SettingsIcon />} value="settings" />
        {readonly ? (
          <BottomNavigationAction label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350, fontSize: '12px' }}>{t('loginLogout')}</Typography> className={classes.bottomNavAction} icon={<ExitToAppIcon />} value="logout" />
        ) : (
          <BottomNavigationAction label=<Typography sx={{ fontFamily: 'Product Sans', fontWeight: 350, fontSize: '12px' }}>{t('settingsUser')}</Typography> className={classes.bottomNavAction} icon={<PersonIcon />} value="account" />
        )}
      </BottomNavigation>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={handleAccount}>
          <Typography
            color="textPrimary"
            sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
          >
            {t('settingsUser')}

          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography
            color="error"
            sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}
          >
            {t('loginLogout')}

          </Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default BottomMenu;
