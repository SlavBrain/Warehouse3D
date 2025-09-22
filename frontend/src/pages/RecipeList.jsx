import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('/recipes').then(res => setRecipes(res.data));
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: '240px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Рецепты</Typography>
        <List>
          {recipes.map(r => (
            <ListItem key={r._id}>
              <ListItemText
                primary={r.name}
                secondary={`Себестоимость: ${r.components.reduce((sum, c) => sum + c.productId.purchasePrice * c.quantity, 0)}₽`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
