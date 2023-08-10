import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { useForm } from '../hooks/useForm.js';
import AuthForm from './AuthForm.js';

function Login({ handleLogin, setEmail, onError }) {

  const {formValues, setFormValues, handleChange} = useForm({email: '', password:''})

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await auth.authorize(formValues.email, formValues.password);
      localStorage.setItem('token', data.token);
      handleLogin();
      navigate('/', { replace: true });
      setEmail(formValues.email);
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
