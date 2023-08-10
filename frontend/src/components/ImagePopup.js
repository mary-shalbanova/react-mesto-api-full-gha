import React from 'react';

function ImagePopup({card, onClose}) {
  return (
    <section className={`popup popup_type_image ${card && 'popup_opened'}`}>
      <div className='popup__image-wrapper'>
        <button
          type='button'
          className='button popup__close-button popup__close-button_type_image fade'
          aria-label='Закрыть'
          onClick={onClose}
        />
        <figure className='popup__figure'>
          <img className='popup__image' src={card ? card.link : ''} alt={card ? card.name : ''} />
          <figcaption className='popup__image-text'>{card ? card.name : ''}</figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
