import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = ({ drawerWidth }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
      },
    }}
  >
    <List>
      <ListItem button component={Link} to="/">
        <ListItemText primary="Склад" />
      </ListItem>
      <ListItem button component={Link} to="/recipes">
        <ListItemText primary="Рецепты" />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
