import React, { useState } from "react";

import "./App.css";
import CheckoutScreen from "./pages/Checkout/CheckoutScreen";
import SummaryScreen from "./pages/Summary/SummaryScreen";
import { Box } from "@mui/material";

const items = [
  {
    size: "M",
    productName: "T-Shirt",
    subtotal: 25.0,
    shipping: 5.0,
    type: "shirt",
  },
  {
    size: "L",
    productName: "Jeans",
    subtotal: 50.0,
    shipping: 7.0,
    type: "pants",
  },
  {
    size: "S",
    productName: "Sneakers",
    subtotal: 70.0,
    shipping: 10.0,
    type: "shoes",
  },
];

const App: React.FC = () => {
  const [discountPercent, setDiscountPercent] = useState<number>(10);

  const amount = items.reduce((acc, item) => acc + item.subtotal, 0);
  return (
    <Box display="flex" justifyContent="space-between" width="100%">
      <Box flex={1} p={2}>
        <CheckoutScreen />
      </Box>
      <Box flex={1} p={2}>
        <SummaryScreen
          amount={amount}
          discountPercent={discountPercent}
          items={items}
        />
      </Box>
    </Box>
  );
};

export default App;
