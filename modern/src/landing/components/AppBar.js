import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Image from 'mui-image';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { Container } from '@mui/system';

const ElevationScroll = (props) => {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    style: {
      background: trigger ? '#fff' : '#F5FF01',
    },
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in a n iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const MissaAppBar = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <ElevationScroll {...props}>
        <AppBar elevation={0}>
          <Toolbar>
            <Image src="https://svgshare.com/i/qeZ.svg" width={120} />
            <Box sx={{ flexGrow: 1 }} />
            <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }} spacing={2}>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="facebook"
                  component="label"
                  onClick={() => window.location.href = 'https://facebook.com/missa263'}
                >
                  <FacebookIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="twitter"
                  component="label"
                  onClick={() => window.location.href = 'https://twitter.com/missa263'}
                >
                  <TwitterIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="instagram"
                  component="label"
                  onClick={() => window.location.href = 'https://instagram.com/missa.263'}
                >
                  <InstagramIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="whatsapp"
                  component="label"
                  onClick={() => window.location.href = 'https://wa.me/263772367855?text='}
                >
                  <WhatsAppIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="email"
                  component="label"
                  onClick={() => window.location.href = 'mailto:missa@ezyy.cloud'}
                >
                  <EmailIcon color="primary" />
                </IconButton>
              </Grid>
              <Grid div>
                <IconButton
                  color="primary"
                  aria-label="call"
                  component="label"
                  onClick={() => window.location.href = 'tel:+263772367855'}
                >
                  <PhoneAndroidIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
            <Button
              variant="outlined"
              sx={{ borderRadius: '23px', fontFamily: 'Product Sans' }}
              endIcon={<ChevronRightIcon />}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Button>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </Container>
  );
};

export default MissaAppBar;
