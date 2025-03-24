import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Guide from './Guide';
import CodeDisplay from './CodeDisplay';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Главная</Link> | <Link to="/signup">Регистрация</Link> | <Link to="/login">Вход</Link> | <Link to="/code">Код</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Guide />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/code" element={<CodeDisplay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
