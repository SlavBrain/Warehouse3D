import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', form);
    localStorage.setItem('token', res.data.token);
    onLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Логин" onChange={handleChange} />
      <input name="password" type="password" placeholder="Пароль" onChange={handleChange} />
      <button type="submit">Войти</button>
    </form>
  );
}

export default Login;
