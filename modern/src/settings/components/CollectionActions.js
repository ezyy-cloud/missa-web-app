import React, { useState } from 'react';
import {
  IconButton, Menu, MenuItem, useMediaQuery, useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import RemoveDialog from '../../common/components/RemoveDialog';
import { useTranslation } from '../../common/components/LocalizationProvider';

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
  },
}));

const CollectionActions = ({
  itemId, editPath, endpoint, setTimestamp, customAction,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const t = useTranslation();

  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [removing, setRemoving] = useState(false);

  const handleEdit = () => {
    navigate(`${editPath}/${itemId}`);
    setMenuAnchorEl(null);
  };

  const handleRemove = () => {
    setRemoving(true);
    setMenuAnchorEl(null);
  };

  const handleCustom = () => {
    customAction.handler(itemId);
    setMenuAnchorEl(null);
  };

  const handleRemoveResult = (removed) => {
    setRemoving(false);
    if (removed) {
      setTimestamp(Date.now());
    }
  };

  return (
    <>
      {phone ? (
        <>
          <IconButton size="small" onClick={(event) => setMenuAnchorEl(event.currentTarget)}>
            <MoreVertIcon fontSize="small" color="secondary" />
          </IconButton>
          <Menu open={!!menuAnchorEl} anchorEl={menuAnchorEl} onClose={() => setMenuAnchorEl(null)}>
            {customAction && (
              <MenuItem onClick={handleCustom} sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{customAction.title}</MenuItem>
            )}
            <MenuItem onClick={handleEdit} sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedEdit')}</MenuItem>
            <MenuItem onClick={handleRemove} sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{t('sharedRemove')}</MenuItem>
          </Menu>
        </>
      ) : (
        <div className={classes.row}>
          {customAction && (
            <IconButton size="small" onClick={handleCustom}>
              {customAction.icon}
            </IconButton>
          )}
          <IconButton size="small" onClick={handleEdit}>
            <EditIcon fontSize="small" sx={{ color: 'grey' }} />
          </IconButton>
          <IconButton size="small" onClick={handleRemove}>
            <DeleteIcon fontSize="small" sx={{ color: 'red' }} />
          </IconButton>
        </div>
      )}
      <RemoveDialog style={{ transform: 'none' }} open={removing} endpoint={endpoint} itemId={itemId} onResult={handleRemoveResult} />
    </>
  );
};

export default CollectionActions;
