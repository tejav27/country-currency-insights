import React, { useContext, useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { CountryCurrencyContext } from "../context/CountryCurrencyContext";

const AmountBar = () => {
  const { amount, setAmount } = useContext(CountryCurrencyContext);
  const [error, setError] = useState(false);

  const handleAmountChange = (event) => {
    const value = event.target.value;
    if (
      value === "" ||
      (Number.isInteger(parseFloat(value)) && parseFloat(value) > 0)
    ) {
      setAmount(value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <TextField
        label="Amount (SEK)"
        value={amount}
        onChange={handleAmountChange}
        error={error}
        helperText={error ? "Please enter a positive integer number" : ""}
        InputProps={{
          inputProps: {
            min: 0,
          },
        }}
        startAdornment={<InputAdornment position="start">SEK</InputAdornment>}
      />
    </div>
  );
};

export default AmountBar;
