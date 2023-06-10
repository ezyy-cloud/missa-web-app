import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import {
  Typography, Container, Paper, AppBar, Toolbar, IconButton, Table, TableHead, TableRow, TableCell, TableBody,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffectAsync } from '../reactHelper';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

const NetworkPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { positionId } = useParams();

  const [item, setItem] = useState({});

  useEffectAsync(async () => {
    if (positionId) {
      const response = await fetch(`/api/positions?id=${positionId}`);
      if (response.ok) {
        const positions = await response.json();
        if (positions.length > 0) {
          setItem(positions[0]);
        }
      } else {
        throw Error(await response.text());
      }
    }
  }, [positionId]);

  const deviceName = useSelector((state) => {
    if (item) {
      const device = state.devices.items[item.deviceId];
      if (device) {
        return device.name;
      }
    }
    return null;
  });

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>
            {deviceName}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <Container maxWidth="sm">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>MCC</TableCell>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>MNC</TableCell>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>LAC</TableCell>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>CID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(item.network?.cellTowers || []).map((cell) => (
                  <TableRow key={cell.cellId}>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{cell.mobileCountryCode}</TableCell>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{cell.mobileNetworkCode}</TableCell>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{cell.locationAreaCode}</TableCell>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{cell.cellId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
        <Container maxWidth="sm">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>MAC</TableCell>
                  <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>RSSI</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(item.network?.wifiAccessPoints || []).map((wifi) => (
                  <TableRow key={wifi.macAddress}>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{wifi.macAddress}</TableCell>
                    <TableCell sx={{ fontFamily: 'Product Sans', fontWeight: 350 }}>{wifi.signalStrength}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </div>
    </div>
  );
};

export default NetworkPage;
