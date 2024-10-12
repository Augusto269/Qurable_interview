import React from 'react';
import { Box, Typography } from '@mui/material';
import TotalAmount from '../../components/Checkout/TotalAmount/TotalAmount';
import OrderSummary from '../../components/Checkout/OrderSummary/OrderSummary';

const SummaryScreen: React.FC = () => {
  const amount = 160.76; // Total amount
  const subtotal = 149.00; // Subtotal
  const shipping = 11.76; // Shipping cost
  const discount = 20.00; // Discount (optional, you can remove this line if there's no discount)

  return (
    <Box p={3} display="flex" flexDirection={'column'} justifyContent="space-between" width="100%" alignItems={'center'}>
      <Typography variant="h5" gutterBottom>
        Total amount
      </Typography>
      <TotalAmount amount={amount} />

      <OrderSummary
        productName="Nike Dunk High Retro"
        size="US 7"
        subtotal={subtotal}
        shipping={shipping}
        discount={discount} 
      />
    </Box>
  );
};

export default SummaryScreen;
