import React, { useState } from 'react';
import { TextField, Grid } from '@mui/material';

interface CardInputProps {
  onCardDetailsChange: (details: { cardNumber: string, expiry: string, cvc: string }) => void;
  loading: boolean;
}

const CardInput: React.FC<CardInputProps> = ({ onCardDetailsChange, loading }) => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiry, setExpiry] = useState<string>('');
  const [cvc, setCvc] = useState<string>('');

  const handleInputChange = () => {
    onCardDetailsChange({ cardNumber, expiry, cvc });
  };

  return (
    <div>
      <TextField
        label="Card number"
        variant="outlined"
        value={cardNumber}
        onChange={(e) => {
          setCardNumber(e.target.value);
          handleInputChange();
        }}
        fullWidth
        disabled={loading}
        margin="normal"
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Expiry"
            variant="outlined"
            value={expiry}
            onChange={(e) => {
              setExpiry(e.target.value);
              handleInputChange();
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="CVC"
            variant="outlined"
            value={cvc}
            onChange={(e) => {
              setCvc(e.target.value);
              handleInputChange();
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CardInput;
