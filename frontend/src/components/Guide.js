import React from 'react';
import { useNavigate } from 'react-router-dom';

const Guide = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Гайд по бэкенду на Go для начинающих</h1>
      <p>
        Здесь вы найдёте подробное руководство, описывающее шаги создания бэкенда на Go с использованием Gin, PostgreSQL, Docker и Docker Compose. 
        <br />
        1. Анализ требований и планирование<br />
        2. Выбор технологий и инструментов<br />
        3. Проектирование архитектуры<br />
        4. Настройка локального окружения<br />
        5. Проектирование базы данных<br />
        6. Реализация бэкенда на Go<br />
        7. Тестирование и обеспечение качества кода<br />
        8. Контейнеризация с помощью Docker<br />
        9. Настройка Docker Compose<br />
        10. CI/CD и деплоймент<br />
        11. Мониторинг и логирование<br />
        12. Документация и поддержка<br />
      </p>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default Guide;
