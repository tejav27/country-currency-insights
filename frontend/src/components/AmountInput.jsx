import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";

const AmountInput = () => {
  const { amount, setAmount } = useContext(CountryCurrencyContext);
  const [error, setError] = useState(false);

  const handleAmountChange = (event) => {
    const value = event.target.value;

    if (/^\d+$/.test(value) && parseInt(value) > 0) {
      setAmount(value);
      setError(false);
    } else {
      setAmount(value);
      setError(true);
    }
  };

  return (
    <div>
      <TextField
        label="Amount (EUR)"
        value={amount}
        onChange={handleAmountChange}
        error={error}
        helperText={error ? "Please enter a positive integer number" : ""}
        InputProps={{
          inputProps: {
            min: 0
          }
        }}
      />
    </div>
  );
};

export default AmountInput;
