const categoryFields = {
  'Электроника': [
    { name: 'voltage', label: 'Напряжение (V)', type: 'number' },
    { name: 'warranty', label: 'Гарантия (мес)', type: 'number' }
  ],
  'Продукты': [
    { name: 'expirationDate', label: 'Срок годности', type: 'date' },
    { name: 'storageTemp', label: 'Температура хранения (°C)', type: 'number' }
  ],
  'Одежда': [
    { name: 'size', label: 'Размер', type: 'text' },
    { name: 'material', label: 'Материал', type: 'text' }
  ]
};

export default categoryFields;
