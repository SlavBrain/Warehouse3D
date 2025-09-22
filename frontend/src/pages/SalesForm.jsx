import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function SalesForm() {
  const [form, setForm] = useState({
    productId: '', salePrice: 0, extraCosts: 0, saleDate: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/sales', form);
    alert('Реализация добавлена');
  };

  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: '240px', padding: '20px', maxWidth: '500px' }}>
        <Typography variant="h5" gutterBottom>Реализация</Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="ID готового изделия" name="productId" onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Цена реализации" name="salePrice" type="number" onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Доп. расходы" name="extraCosts" type="number" onChange={handleChange} fullWidth margin="normal" />
          <TextField label="Дата продажи" name="saleDate" type="date" onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>Реализовать</Button>
        </form>
      </Box>
    </>
  );
}
