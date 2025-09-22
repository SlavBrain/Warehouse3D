import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import NavBar from '../components/NavBar';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export default function QueueList() {
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    axios.get('/queue').then(res => setQueue(res.data));
  }, []);

  const confirm = async id => {
    await axios.put(`/queue/${id}/confirm`);
    alert('Изготовление подтверждено');
    axios.get('/queue').then(res => setQueue(res.data));
  };

  return (
    <>
      <NavBar />
      <Box sx={{ marginLeft: '240px', padding: '20px' }}>
        <Typography variant="h5" gutterBottom>Очередь на изготовление</Typography>
        <List>
          {queue.map(q => (
            <ListItem key={q._id} secondaryAction={
              q.status === 'pending' && (
                <Button variant="contained" onClick={() => confirm(q._id)}>Подтвердить</Button>
              )
            }>
              <ListItemText
                primary={q.recipeId.name}
                secondary={`Статус: ${q.status}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
}
