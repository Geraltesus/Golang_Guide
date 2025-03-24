import React, { useState } from 'react';

function Signup() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        await response.json();
        setMessage('Регистрация прошла успешно!');
      } else {
        setMessage('Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setMessage('Произошла ошибка');
    }
  };

  return (
    <div className="container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Электронная почта:</label>
          <input 
            type="email" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="button">Зарегистрироваться</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Signup;
