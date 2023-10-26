import React, { useContext } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { AmountContext } from '../context/AmountContext';


const AmountBar = () => {
  const { amount, setAmount } = useContext(AmountContext);

    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };
  return (
    <div>
         <TextField
        label="Amount (SEK)"
        value={amount}
        onChange={handleAmountChange}
        InputProps={{
          inputProps: {
            min: 0, 
          },
        }}
        startAdornment={<InputAdornment position="start">SEK</InputAdornment>}
      />
    </div>
  )
}

export default AmountBar