import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  const [textNameInputError, setTextNameInputError] = React.useState('');
  const [textLinkInputError, setTextLinkInputError] = React.useState('');


  const nameErrorClassName = `form__error form__error_type_name ${
    textNameInputError && 'form__error_visible'
  }`;

  const linkErrorClassName = `form__error form__error_type_link ${
    textLinkInputError && 'form__error_visible'
  }`;

  React.useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
      setTextNameInputError('');
      setTextLinkInputError('');
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
      onAddPlace({
        name,
        link,
      });
  }



  function nameInputHandler(e) {
    setName(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 30) {
      setTextNameInputError(
        'Название должно быть длиннее 2 символов и короче 30 символов'
      );
    } else {
      setTextNameInputError('');
    }
  }

  function linkInputHandler(e) {
    setLink(e.target.value);

    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(e.target.value)) {
      setTextLinkInputError('Необходимо ввести адрес URL');
      if (!e.target.value) {
        setTextLinkInputError('Поле не может быть пустым');
      }
    } else {
      setTextLinkInputError('');
    }
  }

  return (
    <PopupWithForm
      title='Новое место'
      name='add'
      buttonTitle='Создать'
      buttonLoadingTitle='Создание...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className='form__textfields'>
        <input
          className='form__input form__input_type_card-heading'
          type='text'
          name='name'
          placeholder='Название'
          required=''
          minLength={2}
          maxLength={30}
          value={name}
          onChange={(e) => nameInputHandler(e)}
        />
        <span className={nameErrorClassName}>{textNameInputError}</span>
        <input
          className='form__input form__input_type_card-link'
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          required=''
          value={link}
          onChange={(e) => linkInputHandler(e)}
        />
        <span className={linkErrorClassName}>{textLinkInputError}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
