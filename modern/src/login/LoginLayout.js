import React from 'react';
import {
  Paper, Grid, Stack, Typography, Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import makeStyles from '@mui/styles/makeStyles';
import { useNavigate } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LogoImage from './LogoImage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  sidebar: {
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.primary.main,
    paddingBottom: theme.spacing(5),
    width: theme.dimensions.sidebarWidth,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    color: theme.palette.secondary.light,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: theme.dimensions.sidebarWidth,
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  form: {
    [theme.breakpoints.up('lg')]: {
      padding: theme.spacing(15),
    },
    [theme.breakpoints.up('xl')]: {
      padding: theme.spacing(40),
    },
    width: '100%',
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sidebarTitle: {
    color: theme.palette.colors.secondary,
    marginLeft: '15px',
  },
  sidebarBody: {
    color: theme.palette.colors.white,
  },

  mobile: {
    width: '100%',
    boxShadow: '-2px 0px 16px rgba(0, 0, 0, 0.25)',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    overflow: 'scroll',
  },
  mobileNav: {
    display: 'flex',
    background: theme.palette.primary.main,
    justifyContent: 'right',
    position: 'fixed',
    right: '0px',
    width: '100%',
    padding: theme.spacing(1),
  },
  mobileHeader: {
    display: 'flex',
    alignItems: 'end',
    marginBottom: theme.spacing(4),
  },
  mobilePaper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: '8vh',
    marginTop: '8vh',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(30),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(4),
    },
  },
  mobileForm: {
    width: '100%',
  },
  mobileSocialBar: {
    marginTop: '2vh',
  },
  mobileSplash: {
    width: '100%',
    marginTop: theme.spacing(7),
  },
}));

const LoginLayout = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Grid item xs={8}>
            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: 'end' }}>
                <LogoImage color={theme.palette.secondary.contrastText} />
                <Typography variant="h4" className={classes.sidebarTitle} sx={{ fontFamily: 'Gotham Rounded' }}>
                  Missa Cloud
                </Typography>
              </Stack>

              <Typography variant="subtitle1" className={classes.sidebarBody} gutterBottom sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}>
                Missa is a telematics platform helping you put a geo
                tracker on everything that matters to you.
                Monitor the location of all your assets right from your connected device. Get in touch today,
                to get started.
              </Typography>
              <div style={{ justifyContent: 'space-between', display: 'flex', marginTop: '4vh', marginBottom: '12vh' }}>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '23px', borderColor: 'yellow', fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                  endIcon={<HomeIcon />}
                  className={classes.menuButton}
                  onClick={() => navigate('/home')}
                >
                  Home
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '23px', borderColor: 'yellow', fontFamily: 'Gotham Rounded', fontWeight: 350 }}
                  endIcon={<ChevronRightIcon />}
                  className={classes.menuButton}
                  onClick={() => {
                    window.open('https://forms.gle/9H5VgxWzHVAcnwsC6', '_blank');
                  }}
                >
                  Sign Up
                </Button>
              </div>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ textAlign: 'center' }}>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="facebook"
                    component="label"
                    onClick={() => window.location.href = 'https://facebook.com/missa263'}
                  >
                    <FacebookIcon color="secondary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="twitter"
                    component="label"
                    onClick={() => window.location.href = 'https://twitter.com/missa263'}
                  >
                    <TwitterIcon color="secondary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="instagram"
                    component="label"
                    onClick={() => window.location.href = 'https://instagram.com/missa.263'}
                  >
                    <InstagramIcon color="secondary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="whatsapp"
                    component="label"
                    onClick={() => window.location.href = 'https://wa.me/263774481007?text='}
                  >
                    <WhatsAppIcon color="secondary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="email"
                    component="label"
                    onClick={() => window.location.href = 'mailto:missa@ezyy.cloud'}
                  >
                    <EmailIcon color="secondary" />
                  </IconButton>
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                  <IconButton
                    color="primary"
                    aria-label="call"
                    component="label"
                    onClick={() => window.location.href = 'tel:+263774481007'}
                  >
                    <PhoneAndroidIcon color="secondary" />
                  </IconButton>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <Paper className={classes.paper}>
        <form className={classes.form}>
          {children}
        </form>
      </Paper>
      <div className={classes.mobile}>
        <div className={classes.mobileNav}>
          <Button
            onClick={() => navigate('/home')}
            color="secondary"
            sx={{ fontFamily: 'Gotham Rounded', fontWeight: 350 }}
          >
            Home
          </Button>
        </div>

        <div className={classes.mobilePaper}>

          <form className={classes.mobileForm}>
            {children}
          </form>

          <Grid container columns={{ xs: 12, sm: 12, md: 12 }} className={classes.mobileSocialBar}>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="facebook"
                component="label"
                onClick={() => window.location.href = 'https://facebook.com/missa263'}
              >
                <FacebookIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="twitter"
                component="label"
                onClick={() => window.location.href = 'https://twitter.com/missa263'}
              >
                <TwitterIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="instagram"
                component="label"
                onClick={() => window.location.href = 'https://instagram.com/missa.263'}
              >
                <InstagramIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="whatsapp"
                component="label"
                onClick={() => window.location.href = 'https://wa.me/message/2U6H2CARUKMBD1'}
              >
                <WhatsAppIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="email"
                component="label"
                onClick={() => window.location.href = 'mailto:missa@ezyy.cloud'}
              >
                <EmailIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="call"
                component="label"
                onClick={() => window.location.href = 'tel:+263774481007'}
              >
                <PhoneAndroidIcon color="primary" />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
    </main>
  );
};

export default LoginLayout;
