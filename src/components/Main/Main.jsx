import { useState, useEffect } from "react"
import { api } from "../../utils/api.js";
import { Card } from "../Card/Card.jsx";

// let userId = '';

function Main ({ onEditProfile, onAddNewCard, onEditAvatar, onCardClick }) {
  
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  // запрос данных о пользователе и массива изначальных карточек
  useEffect(() => {
    api.getData()
    .then(([userDataObj, cardsArray]) => {
      // userId = userDataObj._id
      setUserName(userDataObj.name)
      setUserDescription(userDataObj.about)
      setUserAvatar(userDataObj.avatar)
      cardsArray.forEach((card) => {
        card.userId = userDataObj._id
      })
      setCards(cardsArray)
      // console.dir(cardsArray)
    })
    .catch((err) => {
      console.error(`Что-то пошло не так: ${err}`)
    })
  }, [])
  
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar" type="button" onClick={ onEditAvatar } style={{ backgroundImage: `url(${userAvatar})` }}/>
        <div className="profile__info">
          <div className="profile__text-area">
            <h1 className="profile__user-name">{ userName }</h1>
            <p className="profile__user-caption">{ userDescription }</p>
          </div>
          <button className="profile__button-edit" type="button" onClick={ onEditProfile }/>
        </div>
        <button className="profile__button-add" type="button" onClick={ onAddNewCard }/>
      </section>
      <section className="cards" aria-label="Карточки">
        <ul className="cards__list">
          {cards.map((cardData) => {
            return (<Card key={ cardData._id } card={ cardData } onCardClick={ onCardClick } />)
          })}
        </ul>
      </section>
    </main>
  )
}

export { Main }