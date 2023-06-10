import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import TimelineIcon from '@mui/icons-material/Timeline';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import RouteIcon from '@mui/icons-material/Route';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../../common/components/LocalizationProvider';
import { useAdministrator } from '../../common/util/permissions';

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
      <ListItemText primary=<Typography sx={{ fontFamily: 'Product Sans' }}>{title}</Typography> />
    </ListItemButton>
  );
};

const ReportsMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const admin = useAdministrator();

  return (
    <>
      <List>
        <MenuItem
          title={t('reportRoute')}
          link="/reports/route"
          icon={<TimelineIcon color="secondary" />}
          selected={location.pathname === '/reports/route'}
        />
        <MenuItem
          title={t('reportEvents')}
          link="/reports/event"
          icon={<NotificationsActiveIcon color="secondary" />}
          selected={location.pathname === '/reports/event'}
        />
        <MenuItem
          title={t('reportTrips')}
          link="/reports/trip"
          icon={<PlayCircleFilledIcon color="secondary" />}
          selected={location.pathname === '/reports/trip'}
        />
        <MenuItem
          title={t('reportStops')}
          link="/reports/stop"
          icon={<PauseCircleFilledIcon color="secondary" />}
          selected={location.pathname === '/reports/stop'}
        />
        <MenuItem
          title={t('reportSummary')}
          link="/reports/summary"
          icon={<FormatListBulletedIcon color="secondary" />}
          selected={location.pathname === '/reports/summary'}
        />
        <MenuItem
          title={t('reportChart')}
          link="/reports/chart"
          icon={<TrendingUpIcon color="secondary" />}
          selected={location.pathname === '/reports/chart'}
        />
        <MenuItem
          title={t('reportReplay')}
          link="/replay"
          icon={<RouteIcon color="secondary" />}
        />
      </List>
      {admin && (
        <>
          <Divider sx={{ bgcolor: 'primary.light' }} />
          <List>
            <MenuItem
              title={t('statisticsTitle')}
              link="/reports/statistics"
              icon={<BarChartIcon color="secondary" />}
              selected={location.pathname === '/reports/statistics'}
            />
          </List>
        </>
      )}
    </>
  );
};

export default ReportsMenu;
