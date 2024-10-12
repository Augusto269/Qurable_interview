// OrderSummaryItem.tsx
import React from "react";
import { Typography, Box, Grid } from "@mui/material";

interface OrderSummaryItemProps {
  label?: string;
  value?: string | number;
  size: string | number;
  productName: string;
  subtotal: number;
  shipping: number;
  discount: number;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({
  label,
  value,
}) => {
  return (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography variant="body1" color="textSecondary">
          {label}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          {typeof value === "number" ? `$${value.toFixed(2)}` : value}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummaryItem;
