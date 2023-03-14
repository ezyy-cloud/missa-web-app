import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import makeStyles from '@mui/styles/makeStyles';
import AppBar from './components/AppBar';
import CallOutSection from './components/CallOutSection';
import ProductLineSection from './components/ProductLineSection';
import ServicesSection from './components/ServicesSection';
import CustomSolutionsSection from './components/CustomSolutionsSection';
import ClientReferralSection from './components/ClientReferralSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';

const useStyles = makeStyles(() => ({
  root: {},
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <main className={classes.root}>
      <CssBaseline />
      <AppBar />
      <CallOutSection />
      <ProductLineSection />
      <ServicesSection />
      <CustomSolutionsSection />
      <ClientReferralSection />
      <FaqSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
