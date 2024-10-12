import React, { useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";

interface DiscountCodeProps {
  onApply: (code: string) => void;
  isLoading?: boolean;
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ onApply, isLoading }) => {
  const [code, setCode] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    setCode(inputValue.slice(0, 6));
  };

  const handleApply = () => {
    if (code.length === 6) {
      onApply(code);
    }
  };

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap">
      <TextField
        label="Discount code"
        variant="outlined"
        value={code}
        inputProps={{ maxLength: 6 }}
        onChange={handleChange}
        sx={{ flex: 1, minWidth: "200px" }}
        margin="normal"
        disabled={isLoading}
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
