// OrderSummaryItem.tsx
import React from "react";
import { Typography, Box, Grid } from "@mui/material";

interface OrderSummaryItemProps {
  size: string | number;
  productName: string;
  subtotal: number;
  shipping?: number;
  discount: number;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  size,
  productName,
  subtotal,
  shipping,
  discount,
}) => {
  const discountAmount = (subtotal * discount) / 100;
  const discountedSubtotal = subtotal - discountAmount;

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="body1" color="textSecondary">
          {productName} - Size: {size}
        </Typography>
      </Grid>
      <Grid item>
        <Box>
          <Typography
            variant="body1"
            style={{ textDecoration: "line-through", color: "red" }}
          >
            {typeof subtotal === "number"
              ? `$${subtotal.toFixed(2)}`
              : subtotal}
          </Typography>
          <Typography variant="body1">
            {typeof discountedSubtotal === "number"
              ? `$${discountedSubtotal.toFixed(2)}`
              : discountedSubtotal}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default OrderSummaryItem;
