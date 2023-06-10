import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';
import PublishIcon from '@mui/icons-material/Publish';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useAdministrator, useDeviceReadonly, useManager, useRestriction,
} from '../../common/util/permissions';
import useFeatures from '../../common/util/useFeatures';

const useStyles = makeStyles(() => ({
  listItemRoot: {
    '&.Mui-selected': {
      backgroundColor: 'rgb(255 255 255 / 46%)',
    },
    '&:hover': {
      backgroundColor: 'rgb(255 255 255 / 46%)',
    },
  },
}));

const MenuItem = ({
  title, link, icon, selected,
}) => {
  const classes = useStyles();
  return (
    <ListItemButton key={link} component={Link} to={link} selected={selected} classes={{ root: classes.listItemRoot }}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  );
};

const SettingsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction('readonly');
  const deviceReadonly = useDeviceReadonly();
  const admin = useAdministrator();
  const manager = useManager();
  const userId = useSelector((state) => state.session.user.id);

  const features = useFeatures();

  return (
    <>
      <List>
        <MenuItem
          title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedPreferences')}</Typography>
          link="/settings/preferences"
          icon={<SettingsIcon color="secondary" />}
          selected={location.pathname === '/settings/preferences'}
        />
        {!readonly && (
          <>
            <MenuItem
              title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedNotifications')}</Typography>
              link="/settings/notifications"
              icon={<NotificationsIcon color="secondary" />}
              selected={location.pathname.startsWith('/settings/notification')}
            />
            <MenuItem
              title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('settingsUser')}</Typography>
              link={`/settings/user/${userId}`}
              icon={<PersonIcon color="secondary" />}
              selected={location.pathname === `/settings/user/${userId}`}
            />
            {!deviceReadonly && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('deviceTitle')}</Typography>
                link="/settings/devices"
                icon={<SmartphoneIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/device')}
              />
            )}
            <MenuItem
              title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedGeofences')}</Typography>
              link="/geofences"
              icon={<CreateIcon color="secondary" />}
              selected={location.pathname.startsWith('/settings/geofence')}
            />
            {!features.disableGroups && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('settingsGroups')}</Typography>
                link="/settings/groups"
                icon={<FolderIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/group')}
              />
            )}
            {!features.disableDrivers && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedDrivers')}</Typography>
                link="/settings/drivers"
                icon={<PersonIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/driver')}
              />
            )}
            {!features.disableCalendars && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedCalendars')}</Typography>
                link="/settings/calendars"
                icon={<TodayIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/calendar')}
              />
            )}
            {!features.disableComputedAttributes && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedComputedAttributes')}</Typography>
                link="/settings/attributes"
                icon={<StorageIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/attribute')}
              />
            )}
            {!features.disableMaintenance && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedMaintenance')}</Typography>
                link="/settings/maintenances"
                icon={<BuildIcon color="secondary" />}
                selected={location.pathname.startsWith('/settings/maintenance')}
              />
            )}
            <MenuItem
              title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('sharedSavedCommands')}</Typography>
              link="/settings/commands"
              icon={<PublishIcon color="secondary" />}
              selected={location.pathname.startsWith('/settings/command') && !location.pathname.startsWith('/settings/command-send')}
            />
          </>
        )}
      </List>
      {manager && (
        <>
          <Divider sx={{ bgcolor: 'primary.light' }} />
          <List>
            {admin && (
              <MenuItem
                title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('settingsServer')}</Typography>
                link="/settings/server"
                icon={<StorageIcon color="secondary" />}
                selected={location.pathname === '/settings/server'}
              />
            )}
            <MenuItem
              title=<Typography sx={{ fontFamily: 'Product Sans' }}>{t('settingsUsers')}</Typography>
              link="/settings/users"
              icon={<PeopleIcon color="secondary" />}
              selected={location.pathname.startsWith('/settings/user') && location.pathname !== `/settings/user/${userId}`}
            />
          </List>
        </>
      )}
    </>
  );
};

export default SettingsMenu;
