import {
  amber, red, common, green, brown,
} from '@mui/material/colors';

const colors = {
  white: common.white,
  black: common.black,
  background: 'rgba(255, 255, 255, 0.8)',
  primary: common.black,
  secondary: 'rgba(248, 231, 28, 1)',
  positive: green[600],
  medium: amber[500],
  negative: red[600],
  neutral: brown[500],
  geometry: '#ff8400',
};

export default {
  common: {
    black: colors.black,
    white: colors.white,
  },
  background: {
    paper: colors.white,
    default: 'rgba(255, 255, 255, 0.44)',
  },
  primary: {
    light: 'rgba(99, 99, 99, 1)',
    main: colors.black,
    dark: 'rgba(70, 70, 70, 1)',
    contrastText: colors.white,
  },
  secondary: {
    light: 'rgba(245, 255, 1, 1)',
    main: 'rgba(248, 231, 28, 1)',
    dark: 'rgba(219, 205, 43, 1)',
    contrastText: colors.black,
  },
  error: {
    light: '#e57373',
    main: '#f44336',
    dark: '#d32f2f',
    contrastText: colors.white,
  },
  text: {
    primary: 'rgba(0, 0, 0)',
    secondary: 'rgba(0, 0, 0, 0.34)',
    disabled: 'rgba(90, 90, 90, 0.8)',
    hint: 'rgba(100, 100, 100, 0.8)',
  },
  colors,
};
