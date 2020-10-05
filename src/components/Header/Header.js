import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
        <nav>
          <span>
            {this.context.user.name}
          </span>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link className="nav-links"to='/login'>Login</Link>
        {' '}
        <Link className="nav-links"to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header>
        <h1>
          <Link to='/'>
          <span id="white">Speak</span><span id='blue'>EZ</span>
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header
