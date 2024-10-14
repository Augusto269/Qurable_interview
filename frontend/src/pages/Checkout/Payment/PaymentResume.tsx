import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import StickyNavBar from "../../../components/StickyNavBar/SticklyNavBar";
import { useLocation } from "react-router-dom";

const PaymentResumePage: React.FC = () => {
  const location = useLocation();
  const { amountPaid, couponDiscount } = location.state || {};
  return (
    <div>
      <StickyNavBar />
      <Box padding={3}>
        <Typography variant="h5" gutterBottom>
          PaymentResume
        </Typography>
        <Card>
          <CardContent>
            <Typography variant="h6">
              Amount Payed: ${amountPaid?.toFixed(2)}
            </Typography>
            {couponDiscount &&
              couponDiscount.discount_code &&
              couponDiscount.percentage_discount !== undefined && (
                <Box
                  marginTop={2}
                  padding={2}
                  border={1}
                  borderColor="success.main"
                  borderRadius={1}
                >
                  <Typography variant="body1">
                    You have a discount coupon for your next purchase!
                  </Typography>
                  <Typography variant="body2">
                    Discount Code: {couponDiscount.discount_code}
                  </Typography>
                  <Typography variant="body2">
                    Percentage Discount: {couponDiscount.percentage_discount}%
                  </Typography>
                  <Typography variant="body2">
                    Product Type: {couponDiscount.type}
                  </Typography>
                </Box>
              )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default PaymentResumePage;
