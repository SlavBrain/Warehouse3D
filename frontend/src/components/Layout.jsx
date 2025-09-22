import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 240;

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar drawerWidth={drawerWidth} />
      <Box sx={{ flexGrow: 1 }}>
        <Header drawerWidth={drawerWidth} />
        <Box sx={{ p: 2, mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
