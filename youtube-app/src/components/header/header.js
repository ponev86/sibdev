import { Link, NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/auth'
import { searchReset } from '../../store/actions/search'
import logo from '../../logo.svg'
import './header.scss'

function Header() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(searchReset())
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="header__logo" to={'/'}>
          <img src={logo} alt="YTA" />
        </Link>
        <nav>
          <ul className="nav">
            <li className="nav__item">
              <NavLink
                exact
                className="nav__link"
                to="/"
                activeClassName="nav__link_active"
              >
                Поиск
              </NavLink>
            </li>
            <li className="nav__item">
              <NavLink
                className="nav__link"
                to="/favorites"
                activeClassName="nav__link_active"
              >
                Избранное
              </NavLink>
            </li>
            <li className="nav__item nav__item_right">
              <Button type="link" className="nav__link" onClick={logoutHandler}>
                Выход
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
