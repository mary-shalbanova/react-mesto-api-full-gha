import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header({ email, setEmail }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
    setEmail('')
  }

  return (
    <header className='header page__header'>
      <img className='header__logo' src={logo} alt='логотип' />
      <nav className='navbar'>
        <ul className='navbar__container'>
          {location.pathname === '/sign-in' && (
            <li>
              <Link to='/sign-up' className='navbar__link fade'>
                Регистрация
              </Link>
            </li>
          )}
          {location.pathname === '/sign-up' && (
            <li>
              <Link to='/sign-in' className='navbar__link fade'>
                Войти
              </Link>
            </li>
          )}
          {location.pathname === '/' && (
            <li className='navbar__link'>{email}</li>
          )}
          {location.pathname === '/' && (
            <li>
              <button
                className='navbar__link navbar__button'
                onClick={handleSignOut}
              >
                Выйти
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
