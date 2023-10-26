import React from "react";
import Button from "@mui/material/Button";
import theme from '../theme';

const CustomButton = ({ name }) => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }} style={{backgroundColor: `${theme.primaryColor}`}}>
      {name}
    </Button>
  );
};

export default CustomButton;
