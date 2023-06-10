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

const DriversPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/drivers');
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
            <TableCell sx={{ fontFamily: 'Product Sans' }} className={classes.columnAction} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{item.name}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{item.uniqueId}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }} className={classes.columnAction} padding="none">
                <CollectionActions itemId={item.id} editPath="/settings/driver" endpoint="drivers" setTimestamp={setTimestamp} />
              </TableCell>
            </TableRow>
          )) : (<TableShimmer columns={3} endAction />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/driver" />
    </PageLayout>
  );
};

export default DriversPage;
