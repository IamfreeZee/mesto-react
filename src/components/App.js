import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx'
import { api } from '../utils/api.js';
import { Header } from "./Header/Header.jsx";
import { Footer } from "./Footer/Footer.jsx";
import { Main } from "./Main/Main.jsx";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm.jsx";
import { ImagePopup } from "./ImagePopup/ImagePopup.jsx";
import { EditProfilePopup } from './EditProfilePopup/EditProfilePopup.jsx';
import { EditAvatarPopup } from './EditAvatarPopup/EditAvatarPopup.jsx';
import { AddPlacePopup } from './AddPlacePopup/AddPlacePopup.jsx';

function App() {

  // стейты Popup'ов 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddNewCardPopupOpen, setIsAddNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  // стейт кликнутой карточки
  const [selectedCard, setSelectedCard] = useState({})

  // клик по иконке редактирования профиля
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  // клик по иконке добавления новой карточки
  function handleAddNewCardClick () {
    setIsAddNewCardPopupOpen(true)
  }

  // клик по иконке аватара
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  // клик по карточке
  function handleCardClick (card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  } 

  // клик по иконке удаления карточки
  function handleDeleteCardClick () {
    setIsDeleteCardPopupOpen(true)
  }

  // закрытие всех попапов
  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsAddNewCardPopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
  }

  // стейт текущего пользователя для контекста
  const [currentUser, setCurrentUser] = useState({});
  
  // стейт изначальных карточек
  const [cards, setCards] = useState([])
  
  // задание значений стейтам текущего пользователя и изначальных карточек
  useEffect(() => {
    api.getData()
    .then(([userData, cardsData]) => {
      setCurrentUser(userData)
      setCards(cardsData)
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }, [])

  // стейт для удаления карточки
  const [deleteCard, setDeleteCard] = useState({})
  
  // удаление карточки
  function handleCardDelete (evt) {
    evt.preventDefault()
    api.deleteCard(deleteCard._id)
    .then((res) => {
      setCards((cards) => cards.filter((item) => item._id !== deleteCard._id))
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }

  // обновление данных о текущем пользователе
  function handleUpdateUser (userData) {
    api.setUserInfo(userData)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }

  // обновление аватара текущего пользователя
  function handleUpdateAvatar (avatarData) {
    api.setUserAvatar(avatarData)
    .then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }

  // добавление новой карточки
  function handleAddCard (cardData) {
    api.addNewCard(cardData)
    .then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header />

        <Main 
          onEditProfile={ handleEditProfileClick }
          onAddNewCard={ handleAddNewCardClick }
          onEditAvatar={ handleEditAvatarClick }
          onCardClick={ handleCardClick }
          onDeleteCard={ handleDeleteCardClick }
          cards={ cards }
          setCardsState={ setCards }
          setDeleteCard={ setDeleteCard }
        >

        </Main>

        <Footer />
        
        <EditProfilePopup
          isOpen={ isEditProfilePopupOpen }
          onClose={ closeAllPopups }
          onUpdateUser={ handleUpdateUser }
        >

        </EditProfilePopup>

        <EditAvatarPopup
          isOpen={ isEditAvatarPopupOpen }
          onClose={ closeAllPopups }
          onUpdateAvatar={ handleUpdateAvatar }
        >

        </EditAvatarPopup>

        <AddPlacePopup
          isOpen={ isAddNewCardPopupOpen }
          onClose={ closeAllPopups }
          onAddCard={ handleAddCard }
        >

        </AddPlacePopup>

        <PopupWithForm 
          name="delete-card" 
          title="Вы уверены?" 
          isOpen={ isDeleteCardPopupOpen }
          onClose={ closeAllPopups }
          onSubmit={ handleCardDelete }
        >

        </PopupWithForm>

        <ImagePopup
          name="zoom-image"
          card={ selectedCard }
          isOpen={ isImagePopupOpen }
          onClose={ closeAllPopups }
        >

        </ImagePopup>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
