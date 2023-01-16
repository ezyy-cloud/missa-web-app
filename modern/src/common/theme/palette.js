import {
  amber, grey, yellow, red, common, green, brown,
} from '@mui/material/colors';

const colors = {
  white: common.white,
  black: common.black,
  background: grey[300],
  primary: grey[900],
  secondary: yellow[500],
  positive: green[500],
  medium: amber[500],
  negative: red[500],
  neutral: brown[300],
  geometry: '#3bb2d0',
};

export default {
  background: {
    default: colors.background,
  },
  primary: {
    main: colors.primary,
  },
  secondary: {
    main: colors.secondary,
    contrastText: colors.background,
  },
  colors,
};
