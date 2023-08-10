import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const input = React.createRef();

  const [link, setLink] = React.useState('');
  const [errorText, setErrorText] = React.useState('');

  const errorClassName = `form__error form__error_type_link ${
    errorText && 'form__error_visible'
  }`;

  React.useEffect(() => {
    if (isOpen) {
      setLink('');
      setErrorText('')
    }
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: input.current.value,
    });
  }

  function linkInputHandler(e) {
    setLink(e.target.value);

    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(e.target.value)) {
      setErrorText('Необходимо ввести адрес URL');
      if (!e.target.value) {
        setErrorText('Поле не может быть пустым');
      }
    } else {
      setErrorText('');
    }
  }

  return (
    <PopupWithForm
      title='Обновить аватар'
      name='change-avatar'
      buttonTitle='Сохранить'
      buttonLoadingTitle='Cохранение...'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <fieldset className='form__textfields'>
        <input
          className='form__input form__input_type_link'
          type='url'
          name='link'
          placeholder='Ссылка на картинку'
          required=''
          ref={input}
          value={link}
          onChange={(e) => linkInputHandler(e)}
        />
        <span className={errorClassName}>{errorText}</span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
