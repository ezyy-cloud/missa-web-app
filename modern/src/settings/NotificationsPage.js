import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
import { prefixString } from '../common/util/stringUtils';
import { formatBoolean } from '../common/util/formatter';
import { useTranslation } from '../common/components/LocalizationProvider';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import CollectionFab from './components/CollectionFab';
import CollectionActions from './components/CollectionActions';
import TableShimmer from '../common/components/TableShimmer';
import SearchHeader, { filterByKeyword } from './components/SearchHeader';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: '1%',
    paddingRight: theme.spacing(1),
  },
}));

const NotificationsPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/notifications');
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  const formatList = (prefix, value) => {
    if (value) {
      return value
        .split(/[, ]+/)
        .filter(Boolean)
        .map((it) => t(prefixString(prefix, it)))
        .join(', ');
    }
    return '';
  };

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'sharedNotifications']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('notificationType')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('notificationAlways')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedAlarms')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('notificationNotificators')}</TableCell>
            <TableCell className={classes.columnAction} sx={{ fontFamily: 'Gotham Rounded' }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t(prefixString('event', item.type))}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{formatBoolean(item.always, t)}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{formatList('alarm', item.attributes.alarms)}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{formatList('notificator', item.notificators)}</TableCell>
              <TableCell className={classes.columnAction} padding="none" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                <CollectionActions itemId={item.id} editPath="/settings/notification" endpoint="notifications" setTimestamp={setTimestamp} />
              </TableCell>
            </TableRow>
          )) : (<TableShimmer columns={5} endAction />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/notification" />
    </PageLayout>
  );
};

export default NotificationsPage;
