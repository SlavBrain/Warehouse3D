import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function FinishedList() {
  const [finished, setFinished] = useState([]);

  useEffect(() => {
    axios.get('/finished').then(res => setFinished(res.data));
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: '240px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Склад готовой продукции</Typography>
        <List>
          {finished.map(f => (
            <ListItem key={f._id}>
              <ListItemText
                primary={f.recipeId.name}
                secondary={`Дата изготовления: ${new Date(f.manufactureDate).toLocaleDateString()}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
