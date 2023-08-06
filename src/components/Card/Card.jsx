

function Card ({ card, onCardClick }) {

  function handleClick() {
    onCardClick(card)
  }

  return (
    <li className="card">
      <button className="card__button-delete" type="button" />
      <img src={ card.link } alt={ card.name } className="card__image" onClick={ handleClick } />
      <div className="card__text-area">
        <h2 className="card__caption">{ card.name }</h2>
        <div>
          <button className="card__button-like" type="button" />
          <p className="card__like-counter">{ card.likes.length }</p>
        </div>
      </div>
    </li>
  )
}

export { Card }