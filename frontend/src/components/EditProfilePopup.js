import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const [textNameInputError, setTextNameInputError] = React.useState('');
  const [textDescriptionInputError, setTextDescriptionInputError] =
    React.useState('');

  const nameErrorClassName = `form__error form__error_type_name ${
    textNameInputError && 'form__error_visible'
  }`;

  const descriptionErrorClassName = `form__error form__error_type_link ${
    textDescriptionInputError && 'form__error_visible'
  }`;

  React.useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
      setTextNameInputError('');
      setTextDescriptionInputError('');
    }
  }, [isOpen, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!textNameInputError && !textDescriptionInputError) {
      onUpdateUser({
        name,
        about: description,
      });
    }
  }

  function nameInputHandler(e) {
    setName(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 40) {
      setTextNameInputError(
        'Название должно быть длиннее 2 символов и короче 40 символов'
      );
      if (!e.target.value) {
        setTextNameInputError('Поле не может быть пустым');
      }
    } else {
      setTextNameInputError('');
    }
  }

  function descriptionInputHandler(e) {
    setDescription(e.target.value);

    if (e.target.value.length < 2 || e.target.value.length > 200) {
      setTextDescriptionInputError(
        'Название должно быть длиннее 2 символов и короче 200 символов'
      );
      if (!e.target.value) {
        setTextDescriptionInputError('Поле не может быть пустым');
      }
    } else {
      setTextDescriptionInputError('');
    }
  }

  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit'
      buttonTitle='Сохранить'
      buttonLoadingTitle='Cохранение...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className='form__textfields'>
        <input
          className='form__input form__input_type_name'
          type='text'
          name='name'
          placeholder='Имя'
          required=''
          minLength={2}
          maxLength={40}
          value={name}
          onChange={(e) => {
            nameInputHandler(e);
          }}
        />
        <span className={nameErrorClassName}>{textNameInputError}</span>
        <input
          className='form__input form__input_type_about'
          type='text'
          name='about'
          placeholder='О себе'
          required=''
          minLength={2}
          maxLength={200}
          value={description}
          onChange={(e) => {
            descriptionInputHandler(e);
          }}
        />
        <span className={descriptionErrorClassName}>
          {textDescriptionInputError}
        </span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
