import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
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

const DevicesPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/devices');
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'sharedDrivers']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('sharedName')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('deviceIdentifier')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('sharedPhone')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('deviceModel')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('deviceContact')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }} className={classes.columnAction} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Product Sans' }}>{item.name}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans' }}>{item.uniqueId}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans' }}>{item.phone}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans' }}>{item.model}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans' }}>{item.contact}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans' }} className={classes.columnAction} padding="none">
                <CollectionActions itemId={item.id} editPath="/settings/device" endpoint="devices" setTimestamp={setTimestamp} />
              </TableCell>
            </TableRow>
          )) : (<TableShimmer columns={6} endAction sx={{ fontFamily: 'Product Sans' }} />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/device" />
    </PageLayout>
  );
};

export default DevicesPage;
