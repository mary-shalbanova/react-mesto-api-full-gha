import React from 'react';
import Header from './Header';
import Main from './Main';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth.js';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [deletedCard, setDeletedCard] = React.useState(null);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});

  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const [isSuccessfulLogin, setIsSuccessfulLogin] = React.useState(false);

  const [email, setEmail] = React.useState('');

  const navigate = useNavigate();

  async function checkToken() {
    try {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const data = await auth.getContent(token);
        if (data) {
          setEmail(data.data.email);
          setIsLoggedIn(true);
          navigate('/', { replace: true });
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  React.useEffect(() => {
    checkToken();
    //eslint-disable-next-line
  }, []);

  function handleEscButton(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }

  React.useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isConfirmationPopupOpen ||
      selectedCard
    ) {
      document.addEventListener('keydown', handleEscButton);
    }
    return () => {
      document.removeEventListener('keydown', handleEscButton);
    };
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmationPopupOpen,
    selectedCard,
  ]);

  React.useEffect(() => {
    async function fetchCardsData() {
      try {
        const cardList = await api.getCardList();
        setCards(cardList);
      } catch (err) {
        console.error(err);
      }
    }
    fetchCardsData();
  }, []);

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        const userData = await api.getUserInfo();

        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserData();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDeleteClick(card) {
    setIsConfirmationPopupOpen(true);
    setDeletedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  async function handleCardLike(card) {
    try {
      const isLiked = card.likes.some((user) => user._id === currentUser._id);
      const newCard = await api.changeLikeCardStatus(card._id, isLiked);
      const newCards = cards.map((c) => (c._id === newCard._id ? newCard : c));
      setCards(newCards);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleCardDelete(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      await api.deleteCard(deletedCard._id);
      const newCards = cards.filter((c) => c._id !== deletedCard._id);
      setCards(newCards);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateUser(user) {
    try {
      setIsLoading(true);
      const userData = await api.editProfileInfo(user);
      setCurrentUser(userData);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateAvatar(image) {
    try {
      setIsLoading(true);
      const avatar = await api.changeAvatar(image.avatar);
      setCurrentUser(avatar);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddPlaceSubmit(card) {
    try {
      setIsLoading(true);
      const newCard = await api.addNewCard(card);
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleLoginError() {
    setIsInfoTooltipOpen(true);
    setIsSuccessfulLogin(false);
  }

  function handleRegisterSubmit() {
    setIsInfoTooltipOpen(true);
    setIsSuccessfulLogin(true);
  }

  function closeInfoToolTip() {
    if (isSuccessfulLogin) {
      setIsInfoTooltipOpen(false);
      navigate('/sign-in', { replace: true });
    } else {
      setIsInfoTooltipOpen(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page__container'>
        <Header email={email} setEmail={setEmail} />
        <Routes>
          <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteClick}
              />
            }
          />
          <Route
            path='/sign-in'
            element={
              <Login
                handleLogin={() => setIsLoggedIn(true)}
                setEmail={setEmail}
                onError={handleLoginError}
              />
            }
          />
          <Route
            path='/sign-up'
            element={<Register onRegister={handleRegisterSubmit} />}
          />
          <Route
            path='*'
            element={
              isLoggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />
            }
          />
        </Routes>

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeInfoToolTip}
          isSuccess={isSuccessfulLogin}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ConfirmPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
