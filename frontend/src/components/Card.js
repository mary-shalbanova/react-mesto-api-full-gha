import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((user) => user._id === currentUser._id);
  const cardLikeButtonClassName = `cards__like-button button ${
    isLiked && 'cards__like-button_active'
  }`;

  return (
    <li className='cards__item'>
      <img
        className='cards__image'
        src={card.link}
        alt={card.name}
        onClick={() => {
          onCardClick(card);
        }}
      />
      {isOwn && (
        <button
          type='button'
          className='cards__delete-button button fade'
          aria-label='Удалить'
          onClick={()=>onCardDelete(card)}
        />
      )}
      <div className='cards__wrapper'>
        <h2 className='cards__text text-overflow'>{card.name}</h2>
        <div className='cards__like-container'>
          <button
            type='button'
            className={cardLikeButtonClassName}
            aria-label='Нравится'
            onClick={() => {
              onCardLike(card);
            }}
          />
          <span className='cards__like-counter'>{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
