import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { Box, Typography, TextField, Button } from '@mui/material';

export default function ProfitReport() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [profit, setProfit] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfit = async () => {
    if (!from || !to) return alert('Выберите обе даты');
    setLoading(true);
    try {
      const res = await axios.get(`/sales/profit?from=${from}&to=${to}`);
      setProfit(res.data.profit);
    } catch {
      alert('Ошибка при получении прибыли');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: '240px', padding: '20px', maxWidth: '500px' }}>
        <Typography variant="h5" gutterBottom>Отчёт о прибыли</Typography>
        <TextField label="С" type="date" value={from} onChange={e => setFrom(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="По" type="date" value={to} onChange={e => setTo(e.target.value)} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" onClick={fetchProfit} sx={{ mt: 2 }}>Рассчитать</Button>
        {loading && <Typography sx={{ mt: 2 }}>Загрузка...</Typography>}
        {profit !== null && (
          <Typography sx={{ mt: 2 }}>Прибыль: <strong>{profit.toFixed(2)} ₽</strong></Typography>
        )}
      </Box>
    </>
  );
}
