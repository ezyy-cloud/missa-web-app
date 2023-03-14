import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  useMediaQuery, InputLabel, Select, MenuItem, FormControl, Button, TextField, Link, Snackbar, IconButton, Typography, Grid,
  // Tooltip,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CloseIcon from '@mui/icons-material/Close';
// import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sessionActions } from '../store';
import { useLocalization, useTranslation } from '../common/components/LocalizationProvider';
import LoginLayout from './LoginLayout';
import usePersistedState from '../common/util/usePersistedState';
import { handleLoginTokenListeners, nativeEnvironment, nativePostMessage } from '../common/components/NativeInterface';
import LogoImage from './LogoImage';
import { useCatch } from '../reactHelper';

const useStyles = makeStyles((theme) => ({
  fontStyle: {
    fontFamily: 'Gotham Rounded', fontWeight: 350,
  },
  options: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  extraContainer: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  registerButton: {
    minWidth: 'unset',
    backgroundColor: theme.palette.colors.primary,
  },
  loginButton: {
    color: theme.palette.colors.primary,
  },
  resetPassword: {
    cursor: 'pointer',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'end',
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const t = useTranslation();

  const { languages, language, setLanguage } = useLocalization();
  const languageList = Object.entries(languages).map((values) => ({ code: values[0], name: values[1].name }));

  const [failed, setFailed] = useState(false);

  const [email, setEmail] = usePersistedState('loginEmail', '');
  const [password, setPassword] = useState('');

  const registrationEnabled = useSelector((state) => state.session.server.registration);
  const languageEnabled = useSelector((state) => !state.session.server.attributes['ui.disableLoginLanguage']);
  const emailEnabled = useSelector((state) => state.session.server.emailEnabled);

  const [announcementShown, setAnnouncementShown] = useState(false);
  const announcement = useSelector((state) => state.session.server.announcement);

  const generateLoginToken = async () => {
    if (nativeEnvironment) {
      let token = '';
      try {
        const expiration = moment().add(6, 'months').toISOString();
        const response = await fetch('/api/session/token', {
          method: 'POST',
          body: new URLSearchParams(`expiration=${expiration}`),
        });
        if (response.ok) {
          token = await response.text();
        }
      } catch (error) {
        token = '';
      }
      nativePostMessage(`login|${token}`);
    }
  };

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/session', {
        method: 'POST',
        body: new URLSearchParams(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`),
      });
      if (response.ok) {
        const user = await response.json();
        generateLoginToken();
        dispatch(sessionActions.updateUser(user));
        navigate('/');
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      setFailed(true);
      setPassword('');
    }
  };

  const handleTokenLogin = useCatch(async (token) => {
    const response = await fetch(`/api/session?token=${encodeURIComponent(token)}`);
    if (response.ok) {
      const user = await response.json();
      dispatch(sessionActions.updateUser(user));
      navigate('/');
    } else {
      throw Error(await response.text());
    }
  });

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password) {
      handlePasswordLogin(e);
    }
  };

  useEffect(() => nativePostMessage('authentication'), []);

  useEffect(() => {
    const listener = (token) => handleTokenLogin(token);
    handleLoginTokenListeners.add(listener);
    return () => handleLoginTokenListeners.delete(listener);
  }, []);

  return (
    <LoginLayout>
      {/* <div className={classes.options}>
        {nativeEnvironment && (
          <Tooltip title={t('settingsServer')}>
            <IconButton onClick={() => navigate('/change-server')}>
              <LockOpenIcon />
            </IconButton>
          </Tooltip>
        )}
      </div> */}
      <div className={classes.container}>
        {useMediaQuery(theme.breakpoints.down('lg')) && (
        <Grid container spacing={2} className={classes.mobileHeader}>
          <Grid xs={4}>
            <LogoImage color={theme.palette.secondary.contrastText} />
          </Grid>
          <Grid xs={8}>
            <Typography variant="h4" className={classes.sidebarTitle} gutterBottom sx={{ fontFamily: 'Gotham Rounded' }}>
              Missa Cloud
            </Typography>
          </Grid>
        </Grid>
        )}
        <TextField
          required
          error={failed}
          label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userEmail')}</Typography>
          name="email"
          value={email}
          autoComplete="email"
          autoFocus={!email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyUp={handleSpecialKey}
          helperText={failed && 'Invalid username or password'}
          InputProps={{
            className: classes.fontStyle,
          }}
        />
        <TextField
          required
          error={failed}
          label=<Typography sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{t('userPassword')}</Typography>
          name="password"
          value={password}
          type="password"
          autoComplete="current-password"
          autoFocus={!!email}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={handleSpecialKey}
          InputProps={{
            className: classes.fontStyle,
          }}
        />
        <Button
          onClick={handlePasswordLogin}
          onKeyUp={handleSpecialKey}
          variant="contained"
          color="secondary"
          disabled={!email || !password}
          className={classes.loginButton}
          sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
        >
          {t('loginLogin')}
        </Button>
        <div className={classes.extraContainer}>
          {registrationEnabled && (
          <Button
            className={classes.registerButton}
            onClick={() => navigate('/register')}
            disabled={!registrationEnabled}
            color="secondary"
            sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
          >
            {t('loginRegister')}
          </Button>
          )}
          {languageEnabled && (
            <FormControl fullWidth>
              <InputLabel>{t('loginLanguage')}</InputLabel>
              <Select label={t('loginLanguage')} value={language} onChange={(e) => setLanguage(e.target.value)} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                {languageList.map((it) => <MenuItem key={it.code} value={it.code} sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>{it.name}</MenuItem>)}
              </Select>
            </FormControl>
          )}
        </div>
        {emailEnabled && (
          <Link
            onClick={() => navigate('/reset-password')}
            className={classes.resetPassword}
            underline="none"
            variant="caption"
            sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
          >
            {t('loginReset')}
          </Link>
        )}
      </div>
      <Snackbar
        sx={{ fontFamily: 'Gotham Rounded' }}
        open={!!announcement && !announcementShown}
        message={announcement}
        action={(
          <IconButton size="small" color="inherit" onClick={() => setAnnouncementShown(true)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      />
    </LoginLayout>
  );
};

export default LoginPage;
