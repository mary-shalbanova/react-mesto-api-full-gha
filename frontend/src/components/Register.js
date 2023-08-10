import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import AuthForm from './AuthForm.js';
import { useForm } from '../hooks/useForm.js';

function Register({ onRegister }) {
  const { formValues, setFormValues, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = await auth.register(formValues.email, formValues.password);
      if (data.data.email) {
        onRegister();
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Пользователь с таким email уже зарегистрирован');
    }
  }

  return (
    <AuthForm
      title='Регистрация'
      buttonTitle='Зарегистрироваться'
      onSubmit={handleSubmit}
      errorMessage={errorMessage}
      formValues={formValues}
      onChange={handleChange}
    >
      <p className='login__sign-in'>
        <Link to='/sign-in' className='login__text fade'>
          Уже зарегистрированы? Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
