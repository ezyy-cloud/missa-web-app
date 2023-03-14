import { createTheme } from '@mui/material/styles';
import palette from './palette';
import dimensions from './dimensions';
import components from './components';
import font from './font';

const theme = createTheme({
  palette,
  dimensions,
  components,
  font,
});

export default theme;
