import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./App.css";
import CheckoutScreen from "./pages/Checkout/CheckoutScreen";
import SummaryScreen from "./pages/Checkout/Summary/SummaryScreen";
import { Box } from "@mui/material";
import PaymentResumePage from "./pages/Checkout/Payment/PaymentResume";
import NotFound from "./pages/NotFound/NotFound";

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
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  const amount = productsMocked.reduce((acc, item) => acc + item.amount, 0);

  useEffect(() => {
    setDiscountPercent(0);
  }, []);

  return (
    <Router>
      <Routes>
        {" "}
        {/* Updated to use Routes instead of Switch */}
        <Route
          path="/"
          element={
            <Box display="flex" justifyContent="space-between" width="100%">
              {/* Refactoring in other component */}
              <Box flex={1} p={2}>
                <CheckoutScreen
                  setDiscountPercent={setDiscountPercent}
                  productsMocked={productsMocked}
                />
              </Box>
              <Box flex={1} p={2}>
                <SummaryScreen
                  amount={amount}
                  discountPercent={discountPercent}
                  productsMocked={productsMocked}
                />
              </Box>
            </Box>
          }
        />
        <Route path="/checkout" element={<PaymentResumePage />} />{" "}
        {/* Updated to use element prop */}
        <Route path="*" element={<NotFound />} /> {/* Catch all for 404 */}
      </Routes>
    </Router>
  );
};

export default App;
