import React from 'react';

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          className='button popup__close-button fade'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <div
          className={`popup__auth-result ${
            isSuccess
              ? 'popup__auth-result_type_success'
              : 'popup__auth-result_type_fail'
          }`}
        />
        <p className='popup__auth-text'>
          {isSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
