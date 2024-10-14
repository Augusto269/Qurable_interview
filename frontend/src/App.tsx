import React, { useState } from "react";

import "./App.css";
import CheckoutScreen from "./pages/Checkout/CheckoutScreen";
import { Box } from "@mui/material";
import SummaryScreen from "./pages/Checkout/Summary/SummaryScreen";

const productsMocked = [
  {
    size: "M",
    id: "product1",
    productName: "T-Shirt",
    amount: 25.0,
    shipping: 5.0,
    type: "shirt",
  },
  {
    size: "L",
    id: "product2",
    productName: "Jeans",
    amount: 50.0,
    shipping: 7.0,
    type: "pants",
  },
  {
    size: "S",
    id: "product3",
    productName: "Sneakers",
    amount: 70.0,
    shipping: 10.0,
    type: "shoes",
  },
];

const App: React.FC = () => {
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  const amount = productsMocked.reduce((acc, item) => acc + item.amount, 0);
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Box flex={1} p={2}>
        <CheckoutScreen />
      </Box>
      <Box flex={1} p={2}>
        <SummaryScreen
          amount={amount}
          discountPercent={discountPercent}
          productsMocked={productsMocked}
        />
      </Box>
    </Box>
  );
};

export default App;
