import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onSubmit, isLoading}) {


  return (
    <PopupWithForm
      title='Вы уверены?'
      name='delete'
      buttonTitle='Да'
      buttonLoadingTitle ='Удаление...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}

export default ConfirmPopup;
