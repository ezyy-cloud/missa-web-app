import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  containerMap: {
    flexBasis: '40%',
    flexShrink: 0,
  },
  containerMain: {
    overflow: 'auto',
  },
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  columnAction: {
    width: '1%',
    paddingLeft: theme.spacing(1),
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  filter: {
    display: 'inline-flex',
    flexWrap: 'wrap',
    gap: theme.spacing(2),
    padding: theme.spacing(3, 2, 2),
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  filterItem: {
    minWidth: 0,
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  filterButtons: {
    display: 'flex',
    gap: theme.spacing(1),
    flex: `1 1 ${theme.dimensions.filterFormWidth}`,
    fontFamily: 'Gotham Rounded',
  },
  filterButton: {
    flexGrow: 1,
    background: theme.palette.colors.primary,
    fontFamily: 'Gotham Rounded',
    '&:hover': {
      backgroundColor: theme.palette.colors.primary,
    },
  },
  chart: {
    flexGrow: 1,
    overflow: 'hidden',
    fontFamily: 'Gotham Rounded',
    fontWeight: 350,
  },
  fontStyle: {
    fontFamily: 'Gotham Rounded', fontWeight: 350,
  },
}));
