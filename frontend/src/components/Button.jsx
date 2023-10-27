import React from "react";
import Button from "@mui/material/Button";
import theme from '../theme';

const CustomButton = ({ name,  onClick = () => {} }) => {
  const handleClick = () => {
    // Execute your action here if onClick is provided
      onClick();
  };

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 2, mb: 2 }}
      style={{ backgroundColor: `${theme.primaryColor}` }}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};

export default CustomButton;

