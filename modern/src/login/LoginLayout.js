import React from 'react';
import {
  Paper, Grid, Stack, Typography, Tabs, Tab, Box, Button, Accordion, AccordionSummary, AccordionDetails, SvgIcon,
} from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LogoImage from './LogoImage';
import splash1 from '../resources/images/splash1.webp';
import splash2 from '../resources/images/splash2.png';
import splash3 from '../resources/images/splash3.jpeg';
import splash4 from '../resources/images/splash4.jpeg';

const Splash = () => {
  const items = [
    splash1, splash2, splash3, splash4,
  ];

  return (
    <Carousel height={350}>
      {
        items.map((item) => <Item key={item} item={item} />)
      }
    </Carousel>
  );
};

const Item = (props) => {
  const { item } = props;
  return (
    <Paper>

      <img
        src={item}
        alt="splash"
        style={{ width: '100%', height: '100%' }}
      />

    </Paper>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const FleetIcon = (props) => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24" fill="hsl(61, 80%, 48%)">
    <path d="M39.61 196.8L74.8 96.29C88.27 57.78 124.6 32 165.4 32H346.6C387.4 32 423.7 57.78 437.2 96.29L472.4 196.8C495.6 206.4 512 229.3 512 256V448C512 465.7 497.7 480 480 480H448C430.3 480 416 465.7 416 448V400H96V448C96 465.7 81.67 480 64 480H32C14.33 480 0 465.7 0 448V256C0 229.3 16.36 206.4 39.61 196.8V196.8zM109.1 192H402.9L376.8 117.4C372.3 104.6 360.2 96 346.6 96H165.4C151.8 96 139.7 104.6 135.2 117.4L109.1 192zM96 256C78.33 256 64 270.3 64 288C64 305.7 78.33 320 96 320C113.7 320 128 305.7 128 288C128 270.3 113.7 256 96 256zM416 320C433.7 320 448 305.7 448 288C448 270.3 433.7 256 416 256C398.3 256 384 270.3 384 288C384 305.7 398.3 320 416 320z" />
  </SvgIcon>
);
const AssetIcon = (props) => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="hsl(61, 80%, 48%)">
    <path d="M20 18v-4h-3v1h-2v-1H9v1H7v-1H4v4h16M6.33 8l-1.74 4H7v-1h2v1h6v-1h2v1h2.41l-1.74-4H6.33M9 5v1h6V5H9m12.84 7.61c.1.22.16.48.16.8V18c0 .53-.21 1-.6 1.41c-.4.4-.85.59-1.4.59H4c-.55 0-1-.19-1.4-.59C2.21 19 2 18.53 2 18v-4.59c0-.32.06-.58.16-.8L4.5 7.22C4.84 6.41 5.45 6 6.33 6H7V5c0-.55.18-1 .57-1.41C7.96 3.2 8.44 3 9 3h6c.56 0 1.04.2 1.43.59c.39.41.57.86.57 1.41v1h.67c.88 0 1.49.41 1.83 1.22l2.34 5.39z" />
  </SvgIcon>
);
const WorkforceIcon = (props) => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20" fill="hsl(61, 80%, 48%)">
    <path d="M184 88C184 118.9 158.9 144 128 144C97.07 144 72 118.9 72 88C72 57.07 97.07 32 128 32C158.9 32 184 57.07 184 88zM208.4 196.3C178.7 222.7 160 261.2 160 304C160 338.3 171.1 369.8 192 394.5V416C192 433.7 177.7 448 160 448H96C78.33 448 64 433.7 64 416V389.2C26.16 371.2 0 332.7 0 288C0 226.1 50.14 176 112 176H144C167.1 176 190.2 183.5 208.4 196.3V196.3zM64 245.7C54.04 256.9 48 271.8 48 288C48 304.2 54.04 319.1 64 330.3V245.7zM448 416V394.5C468 369.8 480 338.3 480 304C480 261.2 461.3 222.7 431.6 196.3C449.8 183.5 472 176 496 176H528C589.9 176 640 226.1 640 288C640 332.7 613.8 371.2 576 389.2V416C576 433.7 561.7 448 544 448H480C462.3 448 448 433.7 448 416zM576 330.3C585.1 319.1 592 304.2 592 288C592 271.8 585.1 256.9 576 245.7V330.3zM568 88C568 118.9 542.9 144 512 144C481.1 144 456 118.9 456 88C456 57.07 481.1 32 512 32C542.9 32 568 57.07 568 88zM256 96C256 60.65 284.7 32 320 32C355.3 32 384 60.65 384 96C384 131.3 355.3 160 320 160C284.7 160 256 131.3 256 96zM448 304C448 348.7 421.8 387.2 384 405.2V448C384 465.7 369.7 480 352 480H288C270.3 480 256 465.7 256 448V405.2C218.2 387.2 192 348.7 192 304C192 242.1 242.1 192 304 192H336C397.9 192 448 242.1 448 304zM256 346.3V261.7C246 272.9 240 287.8 240 304C240 320.2 246 335.1 256 346.3zM384 261.7V346.3C393.1 335 400 320.2 400 304C400 287.8 393.1 272.9 384 261.7zß" />
  </SvgIcon>
);
const LogisticsIcon = (props) => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20" fill="hsl(61, 80%, 48%)">
    <path d="M112 0C85.49 0 64 21.49 64 48V96H16C7.163 96 0 103.2 0 112C0 120.8 7.163 128 16 128H272C280.8 128 288 135.2 288 144C288 152.8 280.8 160 272 160H48C39.16 160 32 167.2 32 176C32 184.8 39.16 192 48 192H240C248.8 192 256 199.2 256 208C256 216.8 248.8 224 240 224H16C7.163 224 0 231.2 0 240C0 248.8 7.163 256 16 256H208C216.8 256 224 263.2 224 272C224 280.8 216.8 288 208 288H64V416C64 469 106.1 512 160 512C213 512 256 469 256 416H384C384 469 426.1 512 480 512C533 512 576 469 576 416H608C625.7 416 640 401.7 640 384C640 366.3 625.7 352 608 352V237.3C608 220.3 601.3 204 589.3 192L512 114.7C499.1 102.7 483.7 96 466.7 96H416V48C416 21.49 394.5 0 368 0H112zM544 237.3V256H416V160H466.7L544 237.3zM160 464C133.5 464 112 442.5 112 416C112 389.5 133.5 368 160 368C186.5 368 208 389.5 208 416C208 442.5 186.5 464 160 464zM528 416C528 442.5 506.5 464 480 464C453.5 464 432 442.5 432 416C432 389.5 453.5 368 480 368C506.5 368 528 389.5 528 416z" />
  </SvgIcon>
);
const PublicIcon = (props) => (
  <SvgIcon {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20" height="20" fill="hsl(61, 80%, 48%)">
    <path d="M592 384H576C576 437 533 480 480 480C426.1 480 384 437 384 384H256C256 437 213 480 160 480C106.1 480 64 437 64 384H48C21.49 384 0 362.5 0 336V104C0 64.24 32.24 32 72 32H465.1C483.1 32 501.9 40.34 514.1 54.78L624.1 186.5C634.7 197.1 640 212.6 640 227.7V336C640 362.5 618.5 384 592 384zM64 192H160V96H72C67.58 96 64 99.58 64 104V192zM545.1 192L465.1 96H384V192H545.1zM320 192V96H224V192H320zM480 336C453.5 336 432 357.5 432 384C432 410.5 453.5 432 480 432C506.5 432 528 410.5 528 384C528 357.5 506.5 336 480 336zM160 432C186.5 432 208 410.5 208 384C208 357.5 186.5 336 160 336C133.5 336 112 357.5 112 384C112 410.5 133.5 432 160 432z" />
  </SvgIcon>
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
  },
  sidebar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.black,
    paddingBottom: theme.spacing(5),
    width: theme.dimensions.sidebarWidth,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
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
  },
  sidebarBody: {
    color: theme.palette.colors.white,
  },
  sidebarTab: {
    color: theme.palette.colors.neutral,
    '&.Mui-selected': {
      color: theme.palette.colors.background,
    },
    '&.MuiTabs-indicator': {
      display: 'none',
      width: '0px',
      background: '#000000',
    },
    margin: '0px',
    padding: '0px',
    alignItems: 'flex-start',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
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
  const [value, setValue] = React.useState(0);
  const [home, setHome] = React.useState(true);
  const toggleHome = () => setHome((value) => !value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState('panel1');

  const handleAccordianChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const SideBarTabs = styled((props) => (
    <Tabs
      {...props}
      TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
  ))({
    '& .MuiTabs-indicator': {
      display: 'none',
    },
  });

  return (
    <main className={classes.root}>
      <div className={classes.sidebar}>
        <Grid container>
          <Grid xs={4} className={classes.logo}>
            <LogoImage color={theme.palette.secondary.contrastText} />
          </Grid>
          <Grid xs={6}>
            <Stack spacing={2}>
              <Typography variant="h4" className={classes.sidebarTitle} gutterBottom>
                Missa Cloud
              </Typography>

              <Typography variant="subtitle1" className={classes.sidebarBody} gutterBottom>
                Missa is a telematics platform helping you put a geo
                tracker on everything that matters to you.
                Monitor the location of all your assets right from your connected device. Get in touch today,
                to get started.
              </Typography>
              <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
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
                    onClick={() => window.location.href = 'https://instagram.com/missa263'}
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
              <SideBarTabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ children: <span className="sidebarTab" /> }}
              >
                <Tab disableRipple label="Home" {...a11yProps(0)} className={classes.sidebarTab} />
                <Tab disableRipple label="Log In" {...a11yProps(1)} className={classes.sidebarTab} />
              </SideBarTabs>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <Paper className={classes.paper}>
        <TabPanel value={value} index={0}>
          <Splash />
          <Accordion expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')}>
            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
              <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                <Grid item>
                  <FleetIcon color="primary" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography variant="h6">Fleet Management</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Manage your vehicle fleet where ever you are with Missa.
                Monitor Green Driving, Over Speeding, Jamming, Fuel,
                Excessive Idling, Towing, Crashing and add a geofence for your vehicles.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel2'} onChange={handleAccordianChange('panel2')}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
              <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                <Grid item>
                  <AssetIcon color="primary" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography variant="h6">Asset Management</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Secure your movable assets with Missa.
                Asset Tracking systems help to manage equipment
                (generally high-value assets such as generators, tools, containers or
                OHVs) using GPS asset tracking devices.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel3'} onChange={handleAccordianChange('panel3')}>
            <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
              <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                <Grid item>
                  <WorkforceIcon color="primary" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography variant="h6">Workforce Management</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Manage your mobile workforce with Missa.
                Gain near real-time connectivity
                with on-the-go employees. Whether it’s visibility,
                near real-time coaching, additional training or
                helping vehicle operators to hit efficiency targets,
                this solution gives HR the tools they need to make employees even better.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel4'} onChange={handleAccordianChange('panel4')}>
            <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
              <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                <Grid item>
                  <LogisticsIcon color="primary" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography variant="h6">Logistics Management</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Ensure your customers get their deliveries on time.
                Manage your logistics company with Missa from order
                placement through to the delivery. We help field service
                companies and delivery businesses plan out the best
                routes for their drivers each day, whether they are
                trying to provide reliable ETAs and improve customer
                satisfaction or get through a multi-stop delivery
                route in the most efficient way possible.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'panel5'} onChange={handleAccordianChange('panel5')}>
            <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
              <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                <Grid item>
                  <PublicIcon color="primary" />
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography variant="h6">Public Transport</Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                Increase visibility to your customers.
                Join the growing number of companies that
                offer public transport on the Gringo platform
                to enable their customers to find them on demand.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.panel}>
          <form className={classes.form}>
            {children}
          </form>
        </TabPanel>
      </Paper>
      <div className={classes.mobile}>
        <div className={classes.mobileNav}>
          <Button
            onClick={toggleHome}
            color="secondary"
          >
            { home ? 'Login' : 'Home'}
          </Button>
        </div>

        <img src={splash2} alt="splash" className={classes.mobileSplash} />
        <div className={classes.mobilePaper}>
          { home ? (
            <div>
              <Grid container spacing={2} className={classes.mobileHeader}>
                <Grid xs={4}>
                  <LogoImage color={theme.palette.secondary.contrastText} />
                </Grid>
                <Grid xs={8}>
                  <Typography variant="h4" gutterBottom>
                    Missa Cloud
                  </Typography>
                </Grid>
              </Grid>
              <Accordion expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                    <Grid item>
                      <FleetIcon color="primary" />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h6">Fleet Management</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Manage your vehicle fleet where ever you are with Missa.
                    Monitor Green Driving, Over Speeding, Jamming, Fuel,
                    Excessive Idling, Towing, Crashing and add a geofence for your vehicles.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel2'} onChange={handleAccordianChange('panel2')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                  <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                    <Grid item>
                      <AssetIcon color="primary" />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h6">Asset Management</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Secure your movable assets with Missa.
                    Asset Tracking systems help to manage equipment
                    (generally high-value assets such as generators, tools, containers or
                    OHVs) using GPS asset tracking devices.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel3'} onChange={handleAccordianChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                  <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                    <Grid item>
                      <WorkforceIcon color="primary" />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h6">Workforce Management</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Manage your mobile workforce with Missa.
                    Gain near real-time connectivity
                    with on-the-go employees. Whether it’s visibility,
                    near real-time coaching, additional training or
                    helping vehicle operators to hit efficiency targets,
                    this solution gives HR the tools they need to make employees even better.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel4'} onChange={handleAccordianChange('panel4')}>
                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                  <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                    <Grid item>
                      <LogisticsIcon color="primary" />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h6">Logistics Management</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Ensure your customers get their deliveries on time.
                    Manage your logistics company with Missa from order
                    placement through to the delivery. We help field service
                    companies and delivery businesses plan out the best
                    routes for their drivers each day, whether they are
                    trying to provide reliable ETAs and improve customer
                    satisfaction or get through a multi-stop delivery
                    route in the most efficient way possible.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion expanded={expanded === 'panel5'} onChange={handleAccordianChange('panel5')}>
                <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
                  <Grid container wrap="nowrap" spacing={2} className={classes.alignCenter}>
                    <Grid item>
                      <PublicIcon color="primary" />
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h6">Public Transport</Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1">
                    Increase visibility to your customers.
                    Join the growing number of companies that
                    offer public transport on the Gringo platform
                    to enable their customers to find them on demand.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ) : (
            <form className={classes.mobileForm}>
              {children}
            </form>
          )}

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
                onClick={() => window.location.href = 'https://instagram.com/missa263'}
              >
                <InstagramIcon color="primary" />
              </IconButton>
            </Grid>
            <Grid item xs={2} sm={2} md={2}>
              <IconButton
                color="primary"
                aria-label="whatsapp"
                component="label"
                onClick={() => window.location.href = 'https://wa.me/263774481007?text='}
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
