

function PopupWithForm ({ name, title, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={`popup popup_type_${ name } ${ isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={ onClose }/>
        <h3 className="popup__title">{ title }</h3>
        <form className="popup__form" name={ name } id={ name } onSubmit={ onSubmit } noValidate="">
          { children }
          <button className="popup__button-save popup__button-save_active" type="submit" >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  )
}

export { PopupWithForm }