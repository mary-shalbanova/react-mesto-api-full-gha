import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Footer from './Footer';

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <main className='page__content'>
      <section className='profile'>
        <div className='profile__edit-avatar' onClick={onEditAvatar}>
          <img
            className='profile__avatar'
            src={currentUser.avatar}
            alt='аватар'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__wrapper'>
            <h1 className='profile__name text-overflow'>{currentUser.name}</h1>
            <button
              type='button'
              className='profile__edit-button button fade'
              aria-label='Редактировать'
              onClick={onEditProfile}
            />
          </div>
          <p className='profile__occupation text-overflow'>
            {currentUser.about}
          </p>
        </div>
        <button
          type='button'
          className='profile__add-button button fade'
          aria-label='Добавить'
          onClick={onAddPlace}
        />
      </section>
      <section className='elements'>
        <ul className='cards'>
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
    <Footer />
    </>
  );
}

export default Main;
