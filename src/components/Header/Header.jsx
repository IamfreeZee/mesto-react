import logo from '../../images/logo.svg'

function Header () {
  return (
    <header className="header page__header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo"
      />  
    </header>
  )
}

export { Header }