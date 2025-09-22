import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = ({ drawerWidth }) => (
  <AppBar
    position="fixed"
    sx={{
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
    }}
  >
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Склад 3D
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
