import React from 'react';
import { Typography, Box } from '@mui/material';

interface TotalAmountProps {
  amount: number;
}

const TotalAmount: React.FC<TotalAmountProps> = ({ amount }) => {
  return (
    <Box textAlign="center" mb={2}>
      <Typography variant="h4" component="p" color="primary" gutterBottom>
        ${amount.toFixed(2)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Secure Payment
      </Typography>
    </Box>
  );
};

export default TotalAmount;
