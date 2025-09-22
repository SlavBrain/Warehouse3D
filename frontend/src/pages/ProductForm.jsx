import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Stack, Checkbox, FormControlLabel, MenuItem
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

  const [linkToExisting, setLinkToExisting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [existingProducts, setExistingProducts] = useState([]);

  useEffect(() => {
    if (linkToExisting) {
      axios.get('/products').then(res => setExistingProducts(res.data));
    }
  }, [linkToExisting]);

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

    if (linkToExisting && selectedProductId) {
      payload.linkTo = selectedProductId;
    }

    try {
      await axios.post('/products', payload);
      onSuccess();
      setForm({
        name: '',
        category: '',
        quantity: 1,
        purchasePrice: '',
        seller: '',
        customFields: {}
      });
      setLinkToExisting(false);
      setSelectedProductId('');
    } catch (err) {
      console.error('Ошибка при добавлении товара:', err);
    }
  };

  const selectedCategory = categories.find(cat => cat._id === form.category);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Название"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          fullWidth
        />

        <TextField
          select
          label="Категория"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          fullWidth
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

        <FormControlLabel
          control={
            <Checkbox
              checked={linkToExisting}
              onChange={e => setLinkToExisting(e.target.checked)}
            />
          }
          label="Привязать к существующему товару"
        />

        {linkToExisting && (
          <TextField
            select
            label="Выберите товар"
            value={selectedProductId}
            onChange={e => setSelectedProductId(e.target.value)}
            fullWidth
          >
            <MenuItem value="">—</MenuItem>
            {existingProducts.map(p => (
              <MenuItem key={p._id} value={p._id}>
                {p.name} ({p.quantity} шт.)
              </MenuItem>
            ))}
          </TextField>
        )}

         {/* 🔹 Динамические поля из категории */}
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
