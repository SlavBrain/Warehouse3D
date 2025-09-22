import React, { useState } from 'react';
import {
  TextField, Button, Select, MenuItem, InputLabel, FormControl,
  Stack, Typography
} from '@mui/material';
import axios from 'axios';


const ProductForm = ({ categories, onSuccess }) => {

  const [form, setForm] = useState({
    name: '',
    category: '',
    quantity: 0,
    purchasePrice: 0,
    seller:'',
    customFields: {}
  });

  const selectedCategory = categories.find(c => c._id === form.category);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = async () => {
    try {
      alert('Отправка формы:', form);
      await axios.post('/products', form);
      if (onSuccess) onSuccess();
      setForm({
        name: '',
        category: '',
        quantity: 0,
        purchasePrice: 0,
        seller: '',
        customFields: {}        
      });
    } catch (err) {
      console.error('Ошибка добавления товара:', err);
    }
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Добавление товара</Typography>

      <TextField
        label="Название"
        value={form.name}
        onChange={e => handleChange('name', e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Категория</InputLabel>
        <Select
          value={form.category}
          onChange={e => handleChange('category', e.target.value)}
          label="Категория"
        >
          {categories.map(cat => (
            <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Количество"
        type="number"
        value={form.quantity}
        onChange={e => handleChange('quantity', Number(e.target.value))}
        fullWidth
      />

      <TextField
        label="Цена закупки"
        type="number"
        value={form.purchasePrice}
        onChange={e => handleChange('purchasePrice', Number(e.target.value))}
        fullWidth
      />

      <TextField
        label="Продавец"
        value={form.seller}
        onChange={e => handleChange('seller', e.target.value)}
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

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Сохранить
      </Button>
    </Stack>
  );
};

export default ProductForm;
