import React, { useState } from 'react';
import {
  Table, TableRow, TableCell, TableHead, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffectAsync } from '../reactHelper';
import { useTranslation } from '../common/components/LocalizationProvider';
import { formatBoolean } from '../common/util/formatter';
import { prefixString } from '../common/util/stringUtils';
import PageLayout from '../common/components/PageLayout';
import SettingsMenu from './components/SettingsMenu';
import CollectionFab from './components/CollectionFab';
import CollectionActions from './components/CollectionActions';
import TableShimmer from '../common/components/TableShimmer';
import SearchHeader, { filterByKeyword } from './components/SearchHeader';
import { useRestriction } from '../common/util/permissions';

const useStyles = makeStyles((theme) => ({
  columnAction: {
    width: '1%',
    paddingRight: theme.spacing(1),
  },
}));

const CommandsPage = () => {
  const classes = useStyles();
  const t = useTranslation();

  const [timestamp, setTimestamp] = useState(Date.now());
  const [items, setItems] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const limitCommands = useRestriction('limitCommands');

  useEffectAsync(async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/commands');
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
    <PageLayout menu={<SettingsMenu />} breadcrumbs={['settingsTitle', 'sharedSavedCommands']}>
      <SearchHeader keyword={searchKeyword} setKeyword={setSearchKeyword} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedDescription')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('sharedType')}</TableCell>
            <TableCell sx={{ fontFamily: 'Gotham Rounded' }}>{t('commandSendSms')}</TableCell>
            {!limitCommands && <TableCell className={classes.columnAction} sx={{ fontFamily: 'Gotham Rounded' }} />}
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? items.filter(filterByKeyword(searchKeyword)).map((item) => (
            <TableRow key={item.id}>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{item.description}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t(prefixString('command', item.type))}</TableCell>
              <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{formatBoolean(item.textChannel, t)}</TableCell>
              {!limitCommands && (
                <TableCell sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }} className={classes.columnAction} padding="none">
                  <CollectionActions itemId={item.id} editPath="/settings/command" endpoint="commands" setTimestamp={setTimestamp} />
                </TableCell>
              )}
            </TableRow>
          )) : (<TableShimmer columns={limitCommands ? 3 : 4} endAction />)}
        </TableBody>
      </Table>
      <CollectionFab editPath="/settings/command" disabled={limitCommands} />
    </PageLayout>
  );
};

export default CommandsPage;
