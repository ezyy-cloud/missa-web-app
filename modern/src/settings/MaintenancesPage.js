import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
import usePositionAttributes from '../common/attributes/usePositionAttributes';
import { formatDistance, formatSpeed } from '../common/util/formatter';
import { useAttributePreference } from '../common/util/preferences';
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

const MaintenacesPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const positionAttributes = usePositionAttributes(t);

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const speedUnit = useAttributePreference('speedUnit');
  const distanceUnit = useAttributePreference('distanceUnit');

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/maintenance');
      if (response.ok) {
        setItems(await response.json());
      } else {
        throw Error(await response.text());
      }
    } finally {
      setLoading(false);
    }
  }, [timestamp]);

  const convertAttribute = (key, value) => {
    const attribute = positionAttributes[key];
    if (attribute && attribute.dataType) {
      switch (attribute.dataType) {
        case 'speed':
          return formatSpeed(value, speedUnit, t);
        case 'distance':
          return formatDistance(value, distanceUnit, t);
        default:
          return value;
      }
    }

    return value;
  };

  return (
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'sharedMaintenance']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('sharedName')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('sharedType')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('maintenanceStart')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }}>{t('maintenancePeriod')}</TableCell>
            <TableCell sx={{ fontFamily: 'Product Sans' }} className={classes.columnAction} />
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{item.name}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{item.type}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{convertAttribute(item.type, item.start)}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{convertAttribute(item.type, item.period)}</TableCell>
              <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }} className={classes.columnAction} padding="none">
                <CollectionActions itemId={item.id} editPath="/settings/maintenance" endpoint="maintenance" setTimestamp={setTimestamp} />
              </TableCell>
            </TableRow>
          )) : (<TableShimmer columns={5} endAction />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/maintenance" />
    </PageLayout>
  );
};

export default MaintenacesPage;
