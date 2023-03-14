import * as React from 'react';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CommuteIcon from '@mui/icons-material/Commute';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import PetsIcon from '@mui/icons-material/Pets';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapFade from '../../resources/images/mapFade.png';
import LocationMarker from '../../resources/images/location.svg';

const ProductLineSection = () => (
  <Box
    sx={{
      bgcolor: 'white',
      pt: { xs: 4 },
      pb: { xs: 0, sm: 16 },
      pl: { xs: 2, sm: 8 },
      pr: { xs: 2, sm: 8 },
    }}
  >
    <Grid xs={12} container>
      <Grid xs={0} sm={4} md={4} sx={{ position: 'relative', top: '3vh', left: '0', display: { xs: 'none', sm: 'none', md: 'inline' } }}>
        <Image
          src={MapFade}
          sx={{
            position: 'absolute',
            top: '20px',
            left: '0px',
            zIndex: '1',
          }}
          mt={10}
        />
        <Image
          src={LocationMarker}
          style={{
            position: 'absolute',
            top: '0px',
            left: '0px',
            zIndex: '2',
            scale: '1',
          }}
          fit="scale-down"
        />
        <Image
          src="https://i.pinimg.com/originals/93/2e/00/932e0070ec709fe960a1bb4dd8791b1b.png"
          style={{
            position: 'absolute',
            top: '80px',
            left: '30px',
            zIndex: '3',
            transform: 'scaleX(-1)',
          }}
          fit="scale-down"
        />
      </Grid>
      <Grid xs={12} sm={8} md={8}>
        <Grid container xs={12}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '400',
              fontSize: { xs: '35px', sm: '20px', md: '60px' },
            }}
          >
            Get this and so much more
          </Typography>
        </Grid>
        <Grid container xs={12}>
          <Grid container xs={12} sm={6} md={6} mt={6}>
            <Grid xs={3}>
              <Avatar sx={{ bgcolor: '#F5FE03', width: { xs: '60px', sm: '50', md: '80' }, height: { xs: '60px', sm: '50', md: '80' } }}>
                <CommuteIcon color="primary" sx={{ fontSize: { xs: '40px', sm: '30', md: '40' } }} />
              </Avatar>
            </Grid>
            <Grid xs={9}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Gotham Rounded, sans-serif',
                  fontWeight: '400',
                }}
              >
                Vehicle Telematics
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'Gotham Rounded, sans-serif', fontWeight: '300' }}
              >
                Manage your vehicle where ever you are with Missa.
                Monitor Green Driving, Over Speeding, Jamming,
                Fuel, Excessive Idling, Towing, Crashing and add a
                geofence for your vehicles. Fleet packages available
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6} md={6} mt={6}>
            <Grid xs={3}>
              <Avatar sx={{ bgcolor: '#F5FE03', width: { xs: '60px', sm: '50', md: '80' }, height: { xs: '60px', sm: '50', md: '80' } }}>
                <CalendarViewWeekIcon color="primary" sx={{ fontSize: 40 }} />
              </Avatar>
            </Grid>
            <Grid xs={9}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Gotham Rounded, sans-serif',
                  fontWeight: '400',
                }}
              >
                Movable Asset Tracking
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'Gotham Rounded, sans-serif', fontWeight: '300' }}
              >
                Secure your movable assets with Missa. Asset
                Tracking systems help to manage equipment
                (generally high-value assets such as generators,
                tools, containers or OHVs) using GPS asset tracking
                devices.
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6} md={6} mt={6}>
            <Grid xs={3}>
              <Avatar sx={{ bgcolor: '#F5FE03', width: { xs: '60px', sm: '50', md: '80' }, height: { xs: '60px', sm: '50', md: '80' } }}>
                <PetsIcon color="primary" sx={{ fontSize: 40 }} />
              </Avatar>
            </Grid>
            <Grid xs={9}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Gotham Rounded, sans-serif',
                  fontWeight: '400',
                }}
              >
                Livestock & Pet Tracking
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'Gotham Rounded, sans-serif', fontWeight: '300' }}
              >
                Keep an on your livestock herds from your phone. Know where your herds are
                located 24/7 and find them easily if they stray. Keep valuable pets  monitored
                round the clock to ensure you never lose them.
              </Typography>
            </Grid>
          </Grid>
          <Grid container xs={12} sm={6} md={6} mt={6}>
            <Grid xs={3}>
              <Avatar sx={{ bgcolor: '#F5FE03', width: { xs: '60px', sm: '50', md: '80' }, height: { xs: '60px', sm: '50', md: '80' } }}>
                <DevicesOtherIcon color="primary" sx={{ fontSize: 40 }} />
              </Avatar>
            </Grid>
            <Grid xs={9}>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Gotham Rounded, sans-serif',
                  fontWeight: '400',
                }}
              >
                Gadgets Tracking
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontFamily: 'Gotham Rounded, sans-serif', fontWeight: '300' }}
              >
                Always the know location of your phone or laptop. Never lose your gadgets to thieves again.
                Free tracking of devices ensures you only pay for your devices when we find them for you.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid container xs={12} sm={6} md={6} mt={4}>
            <Grid xs={3} />
            <Grid xs={9}>
              <Box>
                <Button
                  variant="contained"
                  href="#contained-buttons"
                  mt={3}
                  sx={{
                    borderRadius: '23px',
                    fontFamily: 'Gotham Rounded, sans-serif',
                  }}
                  onClick={() => {
                    window.open('https://forms.gle/9H5VgxWzHVAcnwsC6', '_blank');
                  }}
                  endIcon={<ChevronRightIcon />}
                >
                  Get a free quote
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export default ProductLineSection;
