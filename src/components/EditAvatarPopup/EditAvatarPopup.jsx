import { useRef } from "react"
import { PopupWithForm } from "../PopupWithForm/PopupWithForm"

function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar }) {

  // реф инпута
  const userAvatar = useRef()

  // отправка формы обновления аватара юзера
  function handleSubmit (evt) {
    evt.preventDefault()
    onUpdateAvatar({[userAvatar.current.name]: userAvatar.current.value})
    evt.target.reset()
  }

  return (
    <PopupWithForm 
      name="edit-avatar" 
      title="Обновить аватар" 
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    >
      <input
        className="popup__input popup__input_user_avatar"
        placeholder="Ссылка на изображение"
        type="url"
        name="userAvatar"
        id="userAvatar"
        required
        ref={ userAvatar }
      />
      <span className="popup__error" id="userAvatar-error" />
    </PopupWithForm>
  )
}

export { EditAvatarPopup }