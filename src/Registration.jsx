import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MyButton from './button/MyButton';
import MyInput from './input/MyInput';
import './style.css'

function Registration({ users, setUsers, user, setUser, email, setEmail, setEmailIsValid, setError, error, password, confirmPassword, setPassword, setConfirmPassword }) {

    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false)

    const validateEmail = (email) => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    function onEmailChange(e) {
      setEmail(e.target.value); 
      setEmailIsValid(validateEmail(e.target.value));
    }

    const isUser = () => users.find((item) => item.email === email);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
          setError('Вы уже зарегистрированы');
          return;
        }

        if (isUser({ email })) {
          setError('Пользователь с таким email уже существует');
          setErrorEmail(true)
          return true;
        }

        if (password !== confirmPassword) {
          setError('Пароли не совпадают');
          setErrorPassword(true);
          setErrorConfirmPassword(true)
          return true;
        }

        else {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          const user = {email, password}
          setUsers([...users, user]);
          localStorage.setItem('users', JSON.stringify({users: users}));
          console.log(users);
          setError('Успешно');
          navigate('/login');
        }
    };

    return (
        <div className="registration">
            <Link to="/">Назад</Link>
            <h1 className="registration__form-title">Регистрация</h1>
            <form className="registration__form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Почта</label>
                    <MyInput
                        className={errorEmail ? "error" : ""}
                        type="email"
                        id="email"
                        value={email}
                        onChange={onEmailChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <MyInput
                        className={errorPassword ? "error" : ""}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <MyInput
                        className={errorConfirmPassword ? "error" : ""}
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <div>{error}</div>}
                <MyButton className="registration__form-button" type="submit">Зарегистрироваться</MyButton>
            </form>
            <p>
              Уже есть аккаунт? <Link className="registration__form-link" to="/login">Войти</Link>
            </p>
        </div>
    );
}

export default Registration;