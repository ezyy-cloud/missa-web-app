import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Paper from '@mui/material/Paper';

const CustomSolutionsSection = () => (

  <Box
    sx={{
      background: 'linear-gradient(-15deg, #F5FF01 40%, #FFF 0%)',
      pt: { xs: 4 },
      pb: { xs: 0, sm: 8 },
      pl: { xs: 2, sm: 8 },
      pr: { xs: 2, sm: 8 },
    }}
  >
    <Typography
      sx={{
        fontFamily: 'Gotham Rounded, sans-serif',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: { xs: '35px', sm: '20px', md: '60px' },
        mb: { xs: 4, sm: 4 },
      }}
    >
      Helping our clients innovate
    </Typography>

    <Grid xs={12} container spacing={{ xs: 0, sm: 3 }}>
      <Grid xs={12} sm={4} sx={{ m: { xs: 1, sm: 0 } }}>
        <Paper elevation={3} square sx={{ p: { xs: 2, sm: 2 } }}>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '400',
              textAlign: 'center',
              mb: { sm: 2 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            Remote Worker Management
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '300',
              textAlign: 'center',
              mb: { sm: 2 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            We provide our clients with real-time visibility into their
            remote workers&apos; locations, job progress, and performance
            data. Our clients use real-time location tracking, job status
            updates, and customisable reporting to make data-driven decisions
            and manage their staff more efficiently. Our platform allows
            you to track remote workers&apos; real-time location for efficient
            collaboration and task assignment, as well as receive real-time job
            status updates to ensure jobs are completed on time. To avoid
            disrupting workflows, our clients integrate our software with
            their existing systems. Our customers have moved away from manual
            tracking and guesswork and toward real-time visibility and data-driven
            decision-making. Let us discuss how our telematics-enabled remote worker
            management software can assist you.
          </Typography>
        </Paper>
      </Grid>
      <Grid xs={12} sm={4} sx={{ m: { xs: 1, sm: 0 } }}>
        <Paper elevation={3} square sx={{ p: { xs: 2, sm: 2 } }}>

          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '400',
              textAlign: 'center',
              mb: { sm: 2 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            Logistics As A Service
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '300',
              textAlign: 'center',
              mb: { sm: 0 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            We provide logistics operators with a comprehensive
            platform for managing all areas of their logistics operations,
            from planning and scheduling to tracking and reporting. Clients
            may improve operations for optimal efficiency and profitability
            by employing capabilities such as real-time visibility,
            automated workflows, and customizable reporting. Order
            processing, scheduling, and billing are examples of manual
            logistics procedures that have been automated. It enables
            the development of bespoke reports that provide insights
            into operations and help clients make data-driven decisions. We understand
            that each logistics firm has distinct demands and requirements, so
            our software is extremely adaptable to match the needs of each
            business. Our platform is used by clients to streamline
            operations, reduce costs, and improve customer satisfaction.
          </Typography>
        </Paper>
      </Grid>
      <Grid xs={12} sm={4} sx={{ m: { xs: 1, sm: 0 } }}>
        <Paper elevation={3} square sx={{ p: { xs: 2, sm: 2 } }}>

          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '400',
              textAlign: 'center',
              mb: { sm: 3 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            Uberize Your Service
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontFamily: 'Gotham Rounded, sans-serif',
              fontWeight: '300',
              textAlign: 'center',
              mb: { sm: 2 },
              pl: { xs: 1, sm: 4 },
              pr: { xs: 1, sm: 4 },
              pt: { xs: 1, sm: 4 },
            }}
          >
            Our Uberization software is the best way
            to turn any service into an on-demand platform.
            Our software, similar to the Uber concept,
            provides a platform for businesses to give
            on-demand services to their customers. Companies
            can deliver highly personalized and efficient
            service to their customers by leveraging features
            like real-time service requests, automated
            dispatching, and customer feedback. Our platform
            enables clients to request services in real time,
            directly from their mobile devices. It automates
            the dispatching process, ensuring that the customer&apos;s
            request is routed to the most convenient service
            provider. Consumers can utilize the program to
            provide feedback on the service they received,
            allowing businesses to improve their offerings
            while maintaining high levels of customer happiness.
          </Typography>
        </Paper>
      </Grid>
    </Grid>

    <Box mt={3} sx={{ ml: { xs: 1, sm: 0 }, pb: { xs: 2, sm: 2 } }}>
      <Button
        variant="contained"
        href="#contained-buttons"
        sx={{
          borderRadius: '23px',
          fontFamily: 'Gotham Rounded, sans-serif',
        }}
        endIcon={<ChevronRightIcon />}
        onClick={() => {
          window.open('https://forms.gle/9H5VgxWzHVAcnwsC6', '_blank');
        }}
      >
        Get a free quote
      </Button>
    </Box>
  </Box>
);

export default CustomSolutionsSection;
