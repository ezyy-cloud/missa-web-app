import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Divider } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MapScreen from '../../resources/images/screen.jpeg';
import MapScreenLarge from '../../resources/images/screenLarge.png';

const CallOutSection = () => (
  <Box
    sx={{
      background: 'linear-gradient(-15deg, #fff 43%, #F5FF01 0%)',
      pt: { xs: 4 },
      pb: { xs: 0, sm: 16 },
      pl: { xs: 2, sm: 8 },
      pr: { xs: 2, sm: 0 },
    }}
  >
    <Grid container>
      <Grid container xs={12} sm={8} md={5}>
        <Box sx={{
          fontSize: { xs: '35px', sm: '20px', md: '60px' },
          fontFamily: 'Product Sans, sans-serif',
          fontWeight: '400',
        }}
        >
          Never lose
          {' '}
          <br />
          {' '}
          sight of what&apos;s
          {' '}
          <br />
          {' '}
          important
        </Box>
        <Divider
          sx={{
            borderTop: '3px solid #000',
            width: '37vh',
            borderBottomWidth: '0',
            height: '0',
          }}
        />
        <Typography
          variant="h6"
          component="h6"
          sx={{
            fontFamily: 'Product Sans, sans-serif',
            fontWeight: '300',
            pr: { xs: 0, sm: 15, md: 25 },
            pt: { xs: 4, sm: 0 },
          }}
        >
          We recognize the importance of your
          assets and we are dedicated to protecting
          them. Our blended asset risk management
          solution provides tailored security for
          complete peace of mind. You can rely
          on us to protect your assets.
        </Typography>
        <Button
          variant="contained"
          href="#contained-buttons"
          sx={{
            borderRadius: '23px',
            fontFamily: 'Product Sans, sans-serif',
            mt: { xs: 4, sm: 0 },
          }}
          endIcon={<ChevronRightIcon />}
          onClick={() => {
            window.open('https://forms.gle/9H5VgxWzHVAcnwsC6', '_blank');
          }}
        >
          Free Quote
        </Button>
      </Grid>
      <Grid container xs={7} sx={{ overflow: 'hidden', display: { xs: 'none', sm: 'none', md: 'inline' }, position: 'relative', top: '0', left: '0', height: '750px' }}>
        <Box
          className="desktop"
          sx={{
            justifyContent: 'end',
            position: 'relative',
            top: '0',
            left: '90px',
            zIndex: '1',
          }}
          style={{ backgroundImage: `url(${MapScreenLarge})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          mt={4}
        />
        <Box
          className="phone"
          sx={{
            justifyContent: 'end',
            position: 'absolute',
            top: '70px',
            left: '30px',
            zIndex: '2',
          }}
          style={{ backgroundImage: `url(${MapScreen})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
          mt={10}
        />
      </Grid>
    </Grid>
  </Box>
);

export default CallOutSection;
