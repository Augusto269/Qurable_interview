import React from 'react';

import './App.css';
import CheckoutScreen from './pages/Checkout/CheckoutScreen';
import SummaryScreen from './pages/Summary/SummaryScreen';
import { Box } from '@mui/material';

const App: React.FC = () => {
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Box flex={1} p={2}>
        <CheckoutScreen />
      </Box>
      <Box flex={1} p={2}>
        <SummaryScreen />
      </Box>
    </Box>
  );
};


export default App;
