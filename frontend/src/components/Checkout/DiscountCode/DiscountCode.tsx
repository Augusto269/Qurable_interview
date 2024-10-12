import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

interface DiscountCodeProps {
  onApply: (code: string) => void;
  isLoading?: boolean;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ onApply, isLoading }) => {
  const [code, setCode] = useState<string>("");

  const handleApply = () => {
    onApply(code);
  };

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <TextField
        label="Discount code"
        variant="outlined"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ flex: 1, minWidth: "200px" }}
        margin="normal"
      />
      <Button
        variant="contained"
        onClick={handleApply}
        sx={{ marginLeft: 1 }}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <CircularProgress size={20} sx={{ marginRight: 1 }} />
            Loading...
          </>
        ) : (
          "Apply"
        )}
      </Button>
    </Box>
  );
};

export default DiscountCode;
