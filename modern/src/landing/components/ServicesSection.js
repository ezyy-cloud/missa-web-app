import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const ServicesSection = () => (
  <Box
    sx={{
      background: 'linear-gradient(-15deg, #fff 30%, #F5FF01 0%, #F5FF01 70%, #fff 20%',
      pt: { xs: 4 },
      pb: { xs: 0, sm: 16 },
      pl: { xs: 2, sm: 8 },
      pr: { xs: 2, sm: 8 },
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Product Sans, sans-serif',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: { xs: '35px', sm: '20px', md: '60px' },
        mb: { xs: 4, sm: 5 },
        pt: { sm: 10 },
      }}
    >
      Enjoy Value Added Services
    </Typography>

    <Grid xs={12} container rowSpacing={2}>
      <Grid container xs={12} sm={6} md={6} sx={{ mb: 2, pr: { sm: 2 } }}>
        <Card elevation={4} sx={{ display: { md: 'flex' }, borderTopLeftRadius: { sm: '40px' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{ fontFamily: 'Product Sans, sans-serif', fontSize: '25px' }}>
                Telematics Insurance
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Product Sans, sans-serif', fontWeight: '300', fontSize: '18px' }}>
                Usage-Based Insurance (UBI) is a type of auto
                insurance that tracks mileage and driving behaviors.
                The basic idea of UBI is that a driver&#39;s
                behavior is monitored directly while the person drives,
                allowing insurers to more closely align driving behaviors
                with premium rates.
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 300, filter: 'grayscale(100%)' }}
            image="https://media.istockphoto.com/id/1298340803/vector/car-insurance.jpg?s=612x612&w=0&k=20&c=ISKcqtFv0Wvp7VLR7Ep10l4as_rkxA675Lvrjyo2Mn8="
            alt="Live from space album cover"
          />
        </Card>
      </Grid>
      <Grid container xs={12} sm={6} md={6} mb={2} sx={{ mb: 2, pr: { sm: 2 } }}>
        <Card elevation={4} sx={{ display: { md: 'flex' }, borderTopRightRadius: { sm: '40px' } }}>
          <CardMedia
            component="img"
            sx={{ width: 300, filter: 'grayscale(100%)' }}
            image="https://img.freepik.com/free-vector/roadside-service-abstract-concept-illustration_335657-3961.jpg?w=2000"
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{ fontFamily: 'Product Sans, sans-serif', fontSize: '25px' }}>
                Roadside Assistance
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Product Sans, sans-serif', fontWeight: '300', fontSize: '18px' }}>
                Roadside assistance, also known as
                breakdown coverage, is a service that
                assists motorists whose vehicles have suffered a
                mechanical failure that either cannot be
                resolved by the motorist, or has prevented
                them from transporting the vehicle to an
                automobile repair shop.
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
      <Grid container xs={12} sm={6} md={6} mb={2} sx={{ mb: 2, pr: { sm: 2 } }}>
        <Card elevation={4} sx={{ display: { md: 'flex' }, borderBottomLeftRadius: { sm: '40px' } }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{ fontFamily: 'Product Sans, sans-serif', fontSize: '25px' }}>
                Vehicle Maintenance
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Product Sans, sans-serif', fontWeight: '300', fontSize: '18px' }}>
                Vehicle maintenance and servicing is
                carried out when the vehicle completes
                certain kilometres on its normal running
                or when the vehicle does not give proper
                performance. It is suggested that the
                vehicle owners carry out regular and
                periodical checks on their vehicle.
              </Typography>
            </CardContent>
          </Box>
          <CardMedia
            component="img"
            sx={{ width: 300, filter: 'grayscale(100%)' }}
            image="https://img.freepik.com/premium-vector/car-service-repair-illustration-concept_108061-1057.jpg?w=360"
            alt="Live from space album cover"
          />
        </Card>
      </Grid>
      <Grid container xs={12} sm={6} md={6} mb={2} sx={{ mb: 2, pr: { sm: 2 } }}>
        <Card elevation={4} sx={{ display: { md: 'flex' }, borderBottomRightRadius: { sm: '40px' } }}>
          <CardMedia
            component="img"
            sx={{ width: 300, filter: 'grayscale(100%)' }}
            image="https://img.freepik.com/free-vector/electronic-insurance-hardware-digital-insurers-website-responsive-web-design-malware-protection-software-gadgets-security-assurance-vector-isolated-concept-metaphor-illustration_335657-2829.jpg"
            alt="Live from space album cover"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{ fontFamily: 'Product Sans, sans-serif', fontSize: '25px' }}>
                Gadget Insurance
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: 'Product Sans, sans-serif', fontWeight: '300', fontSize: '18px' }}>
                Gadget insurance covers the cost of
                repairing or replacing your gadgets if
                they are lost, damaged or stolen, the
                things you use without a second thought
                every single day, including your mobile phone,
                laptop and fitness tracker. Let Missa protect you
                from losing your gadgets at all cost.
              </Typography>
            </CardContent>
          </Box>
        </Card>
      </Grid>
    </Grid>
    <Box mt={3} ml={1}>
      <Button
        variant="contained"
        href="#contained-buttons"
        sx={{
          borderRadius: '23px',
          fontFamily: 'Product Sans, sans-serif',
        }}
        onClick={() => {
          window.open('https://forms.gle/9H5VgxWzHVAcnwsC6', '_blank');
        }}
        endIcon={<ChevronRightIcon />}
      >
        Get a free quote
      </Button>
    </Box>
  </Box>
);

export default ServicesSection;
