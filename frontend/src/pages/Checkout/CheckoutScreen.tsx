import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import CardInput from "../../components/Checkout/CardInput/CardInput";
import DiscountCode from "../../components/Checkout/DiscountCode/DiscountCode";

const CheckoutScreen: React.FC = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [discountCode, setDiscountCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCardDetailsChange = (details: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => {
    setCardDetails(details);
  };

  const handleApplyDiscountCode = (code: string) => {
    setLoading(true);
    setDiscountCode(code);
  };

  const handlePayment = () => {
    console.log("Card Details:", cardDetails);
    console.log("Discount Code:", discountCode);
  };

  return (
    <Box padding={3}>
      <Typography variant="h6" gutterBottom>
        Final step, make the payment.
      </Typography>
      <Typography variant="body2" gutterBottom>
        To finalize your subscription, kindly complete your payment using a
        valid credit card.
      </Typography>

      <CardInput
        onCardDetailsChange={handleCardDetailsChange}
        loading={loading}
      />

      <DiscountCode onApply={handleApplyDiscountCode} />

      <Button
        variant="contained"
        color="primary"
        onClick={handlePayment}
        fullWidth
      >
        Pay now
      </Button>
    </Box>
  );
};

export default CheckoutScreen;
