import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {GiSuitcase} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <>
      <nav className="header-lg-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="home-jobs">
          <Link to="/" className="link">
            <li>
              <button type="button" className="nav-item">
                Home
              </button>
            </li>
          </Link>
          <Link to="/jobs">
            <li className="nav-item">
              <button type="button" className="nav-item">
                Jobs
              </button>
            </li>
          </Link>
        </ul>
        <button type="button" className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </nav>
      <nav className="header-sm-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
        <ul className="home-jobs">
          <Link to="/" className="link">
            <li>
              <button type="button" className="nav-item">
                <AiFillHome className="icons" />
              </button>
            </li>
          </Link>
          <Link to="/jobs">
            <li className="nav-item">
              <button type="button" className="nav-item">
                <GiSuitcase className="icons" />
              </button>
            </li>
          </Link>

          <li className="nav-item">
            <button
              type="button"
              className="logout-sm-button"
              onClick={onLogout}
            >
              <FiLogOut className="icons" />
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default withRouter(Header)
