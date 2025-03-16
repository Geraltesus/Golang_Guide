const API_URL = 'http://localhost:8080';

export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    throw new Error('Неверные учетные данные');
  }
  const data = await response.json();
  return data.token;
};

export const register = async (username, password) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (!response.ok) {
    const errData = await response.json();
    throw new Error(errData.error || 'Ошибка регистрации');
  }
  const data = await response.json();
  return data.user_id;
};
