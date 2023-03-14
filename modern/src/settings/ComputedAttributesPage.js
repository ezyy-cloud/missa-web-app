import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
import { useTranslation } from '../common/components/LocalizationProvider';
import { useAdministrator } from '../common/util/permissions';
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

const ComputedAttributesPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const administrator = useAdministrator();

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/attributes/computed');
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
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'sharedComputedAttributes']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedDescription')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedAttribute')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedExpression')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedType')}</TableCell>
            {administrator && <TableCell className={classes.columnAction} sx={{ fontFamily: 'Gotham Rounded' }} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{item.description}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{item.attribute}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{item.expression}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{item.type}</TableCell>
              {administrator && (
                <TableCell className={classes.columnAction} padding="none" sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                  <CollectionActions itemId={item.id} editPath="/settings/attribute" endpoint="attributes/computed" setTimestamp={setTimestamp} />
                </TableCell>
              )}
            </TableRow>
          )) : (<TableShimmer columns={administrator ? 5 : 4} endAction={administrator} />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/attribute" disabled={!administrator} />
    </PageLayout>
  );
};

export default ComputedAttributesPage;
