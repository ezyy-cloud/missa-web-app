import * as React from 'react';
import Image from 'mui-image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Confident from '../../resources/images/confident.png';
import Pamushana from '../../resources/images/pamushana.jpeg';

const ClientReferralSection = () => (
  <Box
    sx={{
      background: '#fff',
      pt: { xs: 4 },
      pb: { xs: 4, sm: 16 },
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
        mb: { sm: 4 },
      }}
    >
      We are tracking
    </Typography>

    <Stack
      direction="row"
      spacing={8}
      style={{
        justifyContent: 'center',
      }}
    >
      <Image
        src={Confident}
        width={150}
        style={{
          filter: 'grayscale(1)',
          opacity: 0.5,
        }}
      />
      <Image
        src={Pamushana}
        width={350}
        style={{
          filter: 'grayscale(1)',
          opacity: 0.5,
        }}
      />
    </Stack>

  </Box>
);

export default ClientReferralSection;
