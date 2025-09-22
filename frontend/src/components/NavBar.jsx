import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Inventory, Receipt, Queue, CheckCircle, Sell, BarChart, AddBox } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const menuItems = [
  { text: 'Склад', icon: <Inventory />, path: '/' },
  { text: 'Рецепты', icon: <Receipt />, path: '/recipes' },
  { text: 'Очередь', icon: <Queue />, path: '/queue' },
  { text: 'Готовая продукция', icon: <CheckCircle />, path: '/finished' },
  { text: 'Реализация', icon: <Sell />, path: '/sales' },
  { text: 'Прибыль', icon: <BarChart />, path: '/profit' },
];

export default function NavBar() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {menuItems.map(item => (
          <ListItem button key={item.text} component={Link} to={item.path}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
