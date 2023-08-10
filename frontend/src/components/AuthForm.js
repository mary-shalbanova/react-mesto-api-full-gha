import {React} from 'react';

function AuthForm({title, buttonTitle, children, onSubmit, errorMessage, formValues, onChange}) {

  return (
    <div className='login'>
      <h2 className='login__header'>{title}</h2>
      <form className='form' name='register-form' onSubmit={onSubmit}>
        <fieldset className='form__textfields form__texfields_type_login'>
          <input
            className='form__input form__input_type_login'
            type='email'
            name='email'
            placeholder='Email'
            required={true}
            value={formValues.email}
            onChange={onChange}
          />
          <span
            className={`form__error ${errorMessage && 'form__error_visible'}`}
          >
            {errorMessage}
          </span>
          <input
            className='form__input form__input_type_login'
            type='password'
            name='password'
            placeholder='Пароль'
            required={true}
            value={formValues.password}
            onChange={onChange}
          />
          <span
            className={`form__error ${errorMessage && 'form__error_visible'}`}
          >
            {errorMessage}
          </span>
        </fieldset>
        <button
          type='submit'
          className='button form__submit-button form__submit-button_type_login'
        >
          {buttonTitle}
        </button>
      </form>
      {children}
    </div>
  );
}

export default AuthForm;
