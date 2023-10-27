import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { token, logout } = React.useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <CurrencyExchangeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Country Currency Insights
          </Typography>
          {token && <Button color="inherit" onClick={logout}>Logout</Button>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
