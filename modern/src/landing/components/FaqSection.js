import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepIcon from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';

const stepIconComponent = () => (
  <div>
    <StepIcon icon={<CrisisAlertIcon />} />
  </div>
);

const steps = [
  {
    label: 'What is Missa?',
    description: `Missa is a telematics platform 
                  that helps you geolocate everything 
                  that is important to you. Track the 
                  location of all your assets from any
                  connected device. Get in touch with
                    us right now to get started.`,
  },
  {
    label: 'How do you track phones and laptops?',
    description: `You can download our tracking app for phones.
                  To evade discovery, the tracking application is disguised
                  as a calculator. While entering a high-risk
                    location, enable the monitoring app, and
                    if your phone is stolen, contact us immediately
                      on our hotline before it is wiped. A tiny tracker
                      is inserted within the laptop for laptops. This 
                      will provide you the position of your laptop in real time.`,
  },
  {
    label: 'What happens when a tracked asset is stolen?',
    description: `When an asset tracked by Missa is taken,
                  we urge the victim to file a police report as soon as
                    possible. This will enable our security team to begin
                    tracing the item and catch the individual who was caught
                      with it during a recovery. Missa may call in a ZRP CID
                      member to help with the arrest if necessary. While Missa
                        promises to using reasonable resources to recover your
                        asset as part of our customer care program, we do not
                          guarantee that the asset will be recovered, nor do we
                          have a legal duty to cover the cost of lost assets.`,
  },
];

const useage = [
  {
    label: 'How do I sign up for Missa services?',
    description: `Complete the sign-up form after clicking 
                  the request quotation button. Once this is completed, 
                  our agents will contact you to schedule the installation 
                  of the tracker on your asset. Once the installation is
                  complete, you will be given your login information
                    and can begin tracking your asset.`,
  },
  {
    label: 'How do you track livestock?',
    description: `Our entry-level car trackers start at $60.00.
                  They give basic asset tracking features. Depending on the
                  application, numerous add-on sensors can be included,
                    resulting in a price difference. Livestock trackers
                    start at $80.00. They include the collars and other 
                    essential accoutrements. Get in contact with us
                      immediately for a quote!`,
  },
  {
    label: 'How much does it cost to use Missa?',
    description: `Our entry level vehicle trackers start at $60.00. 
                  These provide basic asset tracking functionality.
                  Depending on application, various add-on sensors can be 
                  included providing a variation in pricing. 
                  Livestock trackers start at $80.00 each. These
                  include the colars and necessary accessories.
                  Get in touch to get a quote today!`,
  },
];
const FaqSection = () => (
  <Box
    sx={{
      background: 'linear-gradient(-15deg, #efefef 100%, #FFF 0%)',
      pt: { xs: 4 },
      pb: { xs: 4, sm: 16 },
      pl: { xs: 2, sm: 8 },
      pr: { xs: 2, sm: 8 },
    }}
  >
    <Typography
      mb={5}
      sx={{
        fontFamily: 'Gotham Rounded, sans-serif',
        fontWeight: '400',
        textAlign: 'center',
        fontSize: { xs: '35px', sm: '20px', md: '60px' },
      }}
    >
      Frequently Asked Questions
    </Typography>
    <Grid xs={12} container>
      <Grid xs={12} sm={6}>
        <Stepper orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label} active>
              <StepLabel
                StepIconComponent={stepIconComponent}
              >
                <Typography
                  style={{
                    fontFamily: 'Gotham Rounded, sans-serif',
                    fontWeight: '400',
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography sx={{
                  fontFamily: 'Gotham Rounded',
                  fontWeight: '300',
                }}
                >
                  {step.description}

                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
      <Grid xs={12} sm={6}>
        <Stepper orientation="vertical">
          {useage.map((step) => (
            <Step key={step.label} active>
              <StepLabel
                StepIconComponent={stepIconComponent}
              >
                <Typography
                  style={{
                    fontFamily: 'Gotham Rounded, sans-serif',
                    fontWeight: '400',
                  }}
                >
                  {step.label}
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography style={{
                  fontFamily: 'Gotham Rounded, sans-serif',
                  fontWeight: '300',
                }}
                >
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
    <Box pt={3} pb={3}>
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

export default FaqSection;
