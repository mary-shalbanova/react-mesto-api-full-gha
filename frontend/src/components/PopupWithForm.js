import React from 'react';

function PopupWithForm({
  title,
  name,
  children,
  buttonTitle,
  buttonLoadingTitle,
  isOpen,
  onClose,
  onSubmit,
  isLoading,

}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
    >
      <div className='popup__container'>
        <button
          type='button'
          className='button popup__close-button fade'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <h2 className='popup__header'>{title}</h2>
        <form
          className='form form_type_edit-profile'
          name={name}
          noValidate={true}
          onSubmit={onSubmit}
        >
          {children}
          <button type='submit' className='button form__submit-button'  >
            {isLoading ? buttonLoadingTitle : buttonTitle}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
