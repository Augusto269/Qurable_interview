import React, { useState } from "react";
import { Button, Typography, Box } from "@mui/material";
import CardInput from "../../components/Checkout/CardInput/CardInput";
import DiscountCode from "../../components/Checkout/DiscountCode/DiscountCode";
import FlashAlert from "../../components/FlashAlerts/FlashAlerts";
import axiosInstance from "../../utils/axiosInstance";
import { ItemsProps } from "./Summary/SummaryScreen";
import { useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

interface CheckoutScreenProps {
  setDiscountPercent: Function;
  productsMocked: ItemsProps[];
}

interface CouponDiscount {
  discount_code: string;
  percentage_discount: number;
  type: string;
}

interface PaymentResponse {
  amountPayed: number;
  coupon_discount: CouponDiscount;
}

const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  setDiscountPercent,
  productsMocked,
}) => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [discountCode, setDiscountCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [discountApply, setDiscountApply] = useState<boolean>(false);
  const navigate = useNavigate();
  //We have to refactor to be more reusable the alert component
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const handleCardDetailsChange = (details: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  }) => {
    setCardDetails(details);
  };

  const handleApplyDiscountCode = async (code: string) => {
    setLoading(true);
    setDiscountCode(code);
    try {
      const response = await axiosInstance.get(`discounts/${code}`);
      setAlert({
        open: true,
        message: "Discount code applied successfully!",
        severity: "success",
      });
      setDiscountApply(true);
      setDiscountPercent(response.data.percentage);
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to apply discount code. Please try again.",
        severity: "error",
      });
      setDiscountApply(false);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const products_id = productsMocked.map((product) => product.id);

      let payload: any = {
        user: "augusto@testings.com",
        amount: productsMocked.reduce((acc, item) => acc + item.amount, 0),
        card_number: cardDetails.cardNumber,
        cvv: cardDetails.cvc,
        expirate_day: cardDetails.expiry,
        products_id,
        client: "qurable_merchant", //Hardcoded value for now
      };
      if (discountCode) payload.coupon_discount = discountCode;
      const response: AxiosResponse<PaymentResponse> = await axiosInstance.post(
        "payments",
        payload,
      );
      const { amountPayed, coupon_discount } = response.data;

      setAlert({
        open: true,
        message: "Discount code applied successfully!",
        severity: "success",
      });

      navigate("/checkout", {
        state: {
          amountPaid: amountPayed,
          couponDiscount: coupon_discount,
        },
      });
    } catch (error) {
      setAlert({
        open: true,
        message: "Failed to apply discount code. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box padding={3}>
      <FlashAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity as "error"}
        handleClose={handleCloseAlert}
      />
      <Typography variant="h6" gutterBottom>
        Final step, make the payment.
      </Typography>
      <Typography variant="body2" gutterBottom>
        To finalize your subscription, kindly complete your payment using a
        valid credit card.
      </Typography>

      <CardInput onCardDetailsChange={handleCardDetailsChange} />

      <DiscountCode
        onApply={handleApplyDiscountCode}
        isLoading={loading}
        discountApply={discountApply}
      />

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
