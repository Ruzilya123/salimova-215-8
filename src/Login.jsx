import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from './button/MyButton';
import MyInput from './input/MyInput';
import { useNavigate } from 'react-router-dom';
import './style.css'

function Login({ onLogin, users, user, email, setEmail, setError, error, password, setPassword, setUser }) {

  const navigate = useNavigate();

  function isUser(user) {
    return users.find((item) => item.email === user.email && item.password === user.password);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {email, password}
    console.log(user)
    if (isUser(user)) {
      setUser(user)
      setError('Успешно');
      navigate('/');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="login">
      <Link to="/">Назад</Link>
      <h1>Вход</h1>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__container">
          <label htmlFor="email">Почта</label>
          <MyInput
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login__container">
          <label htmlFor="password">Пароль</label>
          <MyInput
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}
        <MyButton onClick={onLogin} type="submit">Войти</MyButton>
      </form>
      <p>
        Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
      </p>
    </div>
  );
}

export default Login;