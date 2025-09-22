import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, CircularProgress, Typography, Button, Stack,
  Snackbar, Alert, Dialog, DialogTitle, DialogContent
} from '@mui/material';
import ProductForm from './ProductForm';

console.log('ProductList загружен');

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successOpen, setSuccessOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
  console.log('useEffect сработал');
  const loadData = async () => {
    try {
      console.log('Загрузка данных...');
      const [productsRes, categoriesRes] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      console.log('Товары:', productsRes);
      console.log('Категории:', categoriesRes);
    } catch (err) {
      console.error('Ошибка при загрузке данных:', err);
    } finally {
      setLoading(false);
    }
    };

    loadData();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
      return res.data;
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/categories');
      setCategories(res.data);
      alert('Категории :',res.data);  
      return res.data;          
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err);
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c._id === id);
    return cat?.name || '—';
  };

  const isMergeable = (id) => {
    const cat = categories.find(c => c._id === id);
    return cat?.mergeable;
  };

  const handleProductAdded = () => {
    setSuccessOpen(true);
    setDialogOpen(false);
    fetchProducts();
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="h6">Список товаров</Typography>
          <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
            Добавить товар
          </Button>
        </Stack>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Категория</TableCell>
              <TableCell>Количество</TableCell>
              <TableCell>Цена закупки</TableCell>
              <TableCell>Объединение</TableCell>
              <TableCell>Доп. поля</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{getCategoryName(product.category)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.purchasePrice.toFixed(2)}</TableCell>
                <TableCell>
                  {isMergeable(product.category)
                    ? <Chip label="Да" color="success" size="small" />
                    : <Chip label="Нет" color="default" size="small" />}
                </TableCell>
                <TableCell>
                  {Object.entries(product.customFields || {}).map(([key, value]) => (
                    <div key={key}><strong>{key}:</strong> {value}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Добавить товар</DialogTitle>
        <DialogContent>
          <ProductForm categories={categories} onSuccess={handleProductAdded} />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSuccessOpen(false)}>
          Товар успешно добавлен
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductList;
