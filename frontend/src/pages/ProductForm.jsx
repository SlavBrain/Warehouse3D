import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Stack, MenuItem, Dialog, DialogTitle,
  DialogContent, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';
import axios from 'axios';

const ProductForm = ({ categories, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: 1,
    purchasePrice: '',
    seller: '',
    customFields: {}
  });

  const [existingProducts, setExistingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [linkToExisting, setLinkToExisting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axios.get('/products').then(res => setExistingProducts(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomFieldChange = (key, value) => {
    setForm(prev => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [key]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      quantity: Number(form.quantity),
      purchasePrice: Number(form.purchasePrice)
    };

    if (linkToExisting && selectedProduct?._id) {
      payload.linkTo = selectedProduct._id;
    }

    try {
      await axios.post('/products', payload);
      onSuccess();
      resetForm();
    } catch (err) {
      console.error('Ошибка при добавлении товара:', err);
    }
  };

  const resetForm = () => {
    setForm({
      name: '',
      category: '',
      quantity: 1,
      purchasePrice: '',
      seller: '',
      customFields: {}
    });
    setSelectedProduct(null);
    setLinkToExisting(false);
    setSearchTerm('');
  };

  const selectedCategory = categories.find(cat => cat._id === form.category);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Button variant="outlined" onClick={() => setDialogOpen(true)}>
          Привязать к существующему товару
        </Button>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
          <DialogTitle>Выберите товар для привязки</DialogTitle>
          <DialogContent>
            <TextField
              label="Поиск"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Название</TableCell>
                    <TableCell>Категория</TableCell>
                    <TableCell>Количество</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {existingProducts
                    .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(p => (
                      <TableRow
                        key={p._id}
                        hover
                        onClick={() => {
                          setSelectedProduct(p);
                          setForm(prev => ({
                            ...prev,
                            name: p.name,
                            category: p.category
                          }));
                          setLinkToExisting(true);
                          setDialogOpen(false);
                        }}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{p.name}</TableCell>
                        <TableCell>
                          {categories.find(c => c._id === p.category)?.name || '—'}
                        </TableCell>
                        <TableCell>{p.quantity}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
        </Dialog>

        <TextField
          label="Название"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
          disabled={linkToExisting}
        />

        <TextField
          select
          label="Категория"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          fullWidth
          disabled={linkToExisting}
        >
          {categories.map(cat => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Количество"
          name="quantity"
          type="number"
          value={form.quantity}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Продавец"
          name="seller"
          value={form.seller}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          label="Цена закупки"
          name="purchasePrice"
          type="number"
          value={form.purchasePrice}
          onChange={handleChange}
          required
          fullWidth
        />

        {selectedCategory?.fields?.map(field => (
        <TextField
          key={field.key}
          label={field.label}
          type={field.type}
          value={form.customFields?.[field.key] || ''}
          onChange={e => handleCustomFieldChange(field.key, e.target.value)}
          fullWidth
        />
      ))}

        <Button type="submit" variant="contained" color="primary">
          Сохранить
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
