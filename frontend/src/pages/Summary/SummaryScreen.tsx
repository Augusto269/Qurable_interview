import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import TotalAmount from "../../components/Checkout/TotalAmount/TotalAmount";
import OrderSummary from "../../components/Checkout/OrderSummary/OrderSummary";
import OrderSummaryItem from "../../components/Checkout/OrderSummary/OrderSummary";

interface ItemsProps {
  size: string;
  productName: string;
  subtotal: number;
  shipping: number;
}
interface SummaryScreenProps {
  amount: number;
  items: ItemsProps[];
  discountPercent: number;
}
const SummaryScreen: React.FC<SummaryScreenProps> = ({
  items,
  amount,
  discountPercent,
}) => {
  const calculateFinalAmount = (
    amount: number,
    discountPercent: number,
  ): number => {
    const discountAmount = (amount * discountPercent) / 100;
    return amount - discountAmount;
  };

  const finalAmount = calculateFinalAmount(amount, discountPercent);

  console.log(finalAmount);
  return (
    <Box
      p={3}
      display="flex"
      flexDirection={"column"}
      justifyContent="space-between"
      width="100%"
      alignItems={"center"}
    >
      <Typography variant="h5" gutterBottom>
        Total amount
      </Typography>

      {discountPercent > 0 ? (
        <>
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ textDecoration: "line-through" }}
          >
            ${amount.toFixed(2)}
          </Typography>
          <Typography variant="h6" color="primary">
            ${finalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            You save: ${(amount - finalAmount).toFixed(2)} ({discountPercent}%
            off)
          </Typography>
        </>
      ) : (
        <TotalAmount amount={finalAmount} />
      )}
      <Divider />
      <Grid container direction="column" spacing={2}>
        {items.map((item, index) => (
          <Grid item key={index}>
            <OrderSummaryItem
              size={item.size}
              productName={item.productName}
              subtotal={item.subtotal}
              shipping={item.shipping}
              discount={discountPercent}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SummaryScreen;
