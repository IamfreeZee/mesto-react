import { useContext } from "react"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

function Card ({ cardData, onCardClick, onDeleteCard, onCardLike, setDeletedCard }) {

  // контекст текущего юзера
  const currentUser = useContext(CurrentUserContext)

  // проверка принадлежности карточки текущему юзеру
  const isOwnCard = currentUser._id === cardData.owner._id

  // проверка ставил ли текущий юзер лайк на этой карточке
  const isLiked = cardData.likes.some((item) => {return (item._id === currentUser._id)})

  // клик по карточке записывает данные карточки в стейт для открытия попапа с увеличенным изображением
  function handleCardClick () {
    onCardClick(cardData)
  }

  // клик по мусорке записывает данные карточки в стейт для удаления 
  function handleDeleteCkick () {
    onDeleteCard()
    setDeletedCard(cardData)
  }

  // обработчик клика по лайку
  function handleLikeClick () {
    onCardLike(cardData)
  }

  return (
    <li className="card">
      {(isOwnCard === true) ? <button className="card__button-delete" type="button" onClick={ handleDeleteCkick } /> : ''}
      <img src={ cardData.link } alt={ cardData.name } className="card__image" onClick={ handleCardClick } />
      <div className="card__text-area">
        <h2 className="card__caption">{ cardData.name }</h2>
        <div>
          <button className={`card__button-like ${(isLiked === true) ? "card__button-like_active" : ''}`} type="button" onClick={ handleLikeClick } />
          <p className="card__like-counter">{ cardData.likes.length }</p>
        </div>
      </div>
    </li>
  )
}

export { Card }