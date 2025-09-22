import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Typography, Table, TableHead,
  TableRow, TableCell, TableBody, Stack, Button, TextField, DialogActions,
  TableContainer, Paper
} from '@mui/material';
import axios from 'axios';

const ProductDetailsDialog = ({ open, onClose, product, categories }) => {
  const [analogDialogOpen, setAnalogDialogOpen] = useState(false);
  const [analogSearch, setAnalogSearch] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [analogs, setAnalogs] = useState([]);

  // 🔹 Загрузка всех товаров
  useEffect(() => {
    if (open) {
      axios.get('/products').then(res => setAllProducts(res.data));
    }
  }, [open]);

  // 🔹 Загрузка текущего товара с аналогами
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/products/${product._id}`);
      setCurrentProduct(res.data);
    } catch (err) {
      console.error('Ошибка при загрузке товара:', err);
    }
  };

  useEffect(() => {
    if (open && product?._id) {
      fetchProduct();
    }
  }, [open, product]);

  // 🔹 Обновление списка аналогов
  useEffect(() => {
    if (currentProduct?.analogs?.length && allProducts.length > 0) {
      const matched = allProducts.filter(p => currentProduct.analogs.includes(p._id));
      setAnalogs(matched);
    } else {
      setAnalogs([]);
    }
  }, [currentProduct, allProducts]);

  // 🔹 Добавление аналога
  const handleAddAnalog = async (analogId) => {
    try {
      await axios.post(`/products/${currentProduct._id}/analogs`, { analogId });
      await fetchProduct();
      setAnalogDialogOpen(false);
    } catch (err) {
      console.error('Ошибка при добавлении аналога:', err);
    }
  };

  // 🔹 Удаление аналога
  const handleRemoveAnalog = async (analogId) => {
    try {
      await axios.delete(`/products/${currentProduct._id}/analogs/${analogId}`);
      await fetchProduct();
    } catch (err) {
      console.error('Ошибка при удалении аналога:', err);
    }
  };

  const category = categories.find(c => c._id === currentProduct?.category);

  if (!currentProduct) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Информация о товаре</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Typography><strong>Название:</strong> {currentProduct.name}</Typography>
          <Typography><strong>Категория:</strong> {category?.name || '—'}</Typography>
          <Typography><strong>Количество:</strong> {currentProduct.quantity}</Typography>

          <Typography variant="h6">История закупок</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Продавец</TableCell>
                <TableCell>Цена</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentProduct.purchases?.map((p, i) => (
                <TableRow key={i}>
                  <TableCell>{p.seller || '—'}</TableCell>
                  <TableCell>{typeof p.purchasePrice === 'number' ? p.purchasePrice.toFixed(2) : '—'}</TableCell>
                  <TableCell>{new Date(p.purchaseDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography variant="h6">Дополнительные поля</Typography>
          {Object.entries(currentProduct.customFields || {}).map(([key, value]) => (
            <Typography key={key}><strong>{key}:</strong> {value}</Typography>
          ))}

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Аналоги</Typography>
            <Button variant="outlined" onClick={() => setAnalogDialogOpen(true)}>
              Добавить аналог
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Название</TableCell>
                <TableCell>Категория</TableCell>
                <TableCell>Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {analogs.map(a => (
                <TableRow key={a._id}>
                  <TableCell>{a.name}</TableCell>
                  <TableCell>{categories.find(c => c._id === a.category)?.name || '—'}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRemoveAnalog(a._id)}
                    >
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Закрыть</Button>
      </DialogActions>

      {/* 🔹 Диалог выбора аналога */}
      <Dialog open={analogDialogOpen} onClose={() => setAnalogDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Выберите аналог</DialogTitle>
        <DialogContent>
          <TextField
            label="Поиск"
            value={analogSearch}
            onChange={e => setAnalogSearch(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TableContainer component={Paper}>
            <Table size="small">
              <TableBody>
                {allProducts
                  .filter(p =>
                    p._id !== currentProduct._id &&
                    !currentProduct.analogs?.includes(p._id) &&
                    p.category === currentProduct.category &&
                    p.name.toLowerCase().includes(analogSearch.toLowerCase())
                  )
                  .map(p => (
                    <TableRow
                      key={p._id}
                      hover
                      onClick={() => handleAddAnalog(p._id)}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{categories.find(c => c._id === p.category)?.name || '—'}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAnalogDialogOpen(false)}>Отмена</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default ProductDetailsDialog;
