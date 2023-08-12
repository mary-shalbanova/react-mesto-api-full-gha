import { React, useState } from 'react';
import * as auth from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm.js';
import AuthForm from './AuthForm.js';

function Login({ onError, handleLogin, setEmail }) {

  const {formValues, handleChange} = useForm({email: '', password:''})

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await auth.authorize(formValues.email, formValues.password);
      if (!res) {
        onError();
        setErrorMessage('Неверный логин или пароль');
      } else {
        handleLogin();
        navigate('/', { replace: true });
        setEmail(formValues.email);
      }
    } catch (err) {
      console.error(err);
      onError();
      setErrorMessage('Неверный логин или пароль');
    }
  }

  return (
    <AuthForm
      title='Вход'
      buttonTitle='Войти'
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      formValues={formValues}
      onChange={handleChange}
    />
  );
}

export default Login;
