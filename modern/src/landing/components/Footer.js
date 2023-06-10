import * as React from 'react';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: '#2d2d2d',
        pt: { xs: 4 },
        pb: { xs: 4, sm: 16 },
        pl: { xs: 2, sm: 8 },
        pr: { xs: 2, sm: 8 },
      }}
    >
      <Grid xs={12} container rowSpacing={1}>
        <Grid sm={3} p={4}>
          <Image
            src="https://svgshare.com/i/qeZ.svg"
            width={200}
            fit="scale-down"
            style={{
              filter: 'grayscale(1)',
            }}
          />
        </Grid>
        <Grid sm={3} p={4}>
          <Stack>
            <Typography
              variant="h5"
              component="h5"
              mb={1}
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              Location
            </Typography>

            <Typography
              variant="subtitle"
              component="subtitle"
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              61J Tongogara Street
            </Typography>

            <Typography
              variant="subtitle"
              component="subtitle"
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              Harare
            </Typography>
          </Stack>
        </Grid>
        <Grid sm={3} p={4}>
          <Stack>
            <Typography
              variant="h5"
              component="h5"
              mb={1}
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              Get in touch
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              wecare@ezyy.cloud
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              +263772367855
            </Typography>
          </Stack>
        </Grid>
        <Grid sm={3} p={4}>
          <Stack>
            <Typography
              variant="h5"
              component="h5"
              mb={1}
              sx={{
                fontFamily: 'Product Sans, sans-serif',
                fontWeight: '300',
                color: '#fff',
              }}
            >
              Integrity
            </Typography>

            <Typography
              variant="subtitle1"
            >
              <Link
                sx={{
                  fontFamily: 'Product Sans, sans-serif',
                  fontWeight: '300',
                  color: '#fff',
                }}
                underline="hover"
                target="_blank"
                onClick={() => navigate('/privacy-policy')}
              >
                Privacy Policy

              </Link>
            </Typography>

            <Typography
              variant="subtitle1"
            >
              <Link
                sx={{
                  fontFamily: 'Product Sans, sans-serif',
                  fontWeight: '300',
                  color: '#fff',
                }}
                underline="hover"
                target="_blank"
                onClick={() => navigate('/terms-conditions')}
              >
                Terms and Conditions

              </Link>
            </Typography>
          </Stack>
        </Grid>
        <Grid xs={12} sm={9} smOffset={3} pl={4}>
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: 'Product Sans, sans-serif',
              fontWeight: '300',
              color: '#fff',
            }}
          >
            Another
            {' '}
            <a href="https://ezyy.cloud">
              <b>
                Ezyy
                {' '}
                Cloud

              </b>
            </a>
            {' '}
            -
            {' '}
            { new Date().getFullYear() }

          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
