import { useState } from 'react';
import { Header } from "./Header/Header.jsx";
import { Footer } from "./Footer/Footer.jsx";
import { Main } from "./Main/Main.jsx";
import { PopupWithForm } from "./PopupWithForm/PopupWithForm.jsx";
import { ImagePopup } from "./ImagePopup/ImagePopup.jsx";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddNewCardPopupOpen, setIsAddNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setisImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddNewCardClick () {
    setIsAddNewCardPopupOpen(true)
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick (card) {
    setSelectedCard(card)
    setisImagePopupOpen(true)
  } 

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsAddNewCardPopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setisImagePopupOpen(false)
    // setSelectedCard(false)
  }

  return (
    <div className="page__content">

      <Header />

      <Main 
        onEditProfile={ handleEditProfileClick }
        onAddNewCard={ handleAddNewCardClick }
        onEditAvatar={ handleEditAvatarClick }
        onCardClick={ handleCardClick }
      />

      <Footer />
      
      <PopupWithForm 
        name="edit-profile" 
        title="Редактировать профиль" 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__input popup__input_user_name"
          placeholder="Ваше имя"
          type="text"
          name="userName"
          id="userName"
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="popup__error" id="userName-error" />
        <input
          className="popup__input popup__input_user_caption"
          placeholder="О себе"
          type="text"
          name="userCaption"
          id="userCaption"
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="popup__error" id="userCaption-error" />
      </PopupWithForm>

      <PopupWithForm 
        name="add-new-card" 
        title="Новое место"
        isOpen={isAddNewCardPopupOpen}
        onClose={closeAllPopups} 
      >
        <input
          className="popup__input popup__input_card_name"
          placeholder="Название места"
          type="text"
          name="cardName"
          id="cardName"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="cardName-error" />
        <input
          className="popup__input popup__input_card_link"
          placeholder="Ссылка на изображение"
          type="url"
          name="cardLink"
          id="cardLink"
          required=""
        />
        <span className="popup__error" id="cardLink-error" />
      </PopupWithForm>
      
      <PopupWithForm 
        name="edit-avatar" 
        title="Обновить аватар" 
        isOpen={ isEditAvatarPopupOpen }
        onClose={ closeAllPopups }
      >
        <input
          className="popup__input popup__input_user_avatar"
          placeholder="Ссылка на изображение"
          type="url"
          name="userAvatar"
          id="userAvatar"
          required=""
        />
        <span className="popup__error" id="userAvatar-error" />
      </PopupWithForm>
      
      <PopupWithForm 
        name="delete-card" 
        title="Вы уверены?" 
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
  )
}

export default App;
