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
      <div className='header-controls signed-in'>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link id="search-nav"
            to='/search'>
            Search New Address
          </Link>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='header-controls signed-out'>
        <nav>
          <Link to='/login'>Login</Link>
          {'  |  '}
          <Link to='/register'>Sign up</Link>
        </nav>
      </div>
    )
  }

  render() {
    return (
      <header className='App-Header'>
        <h1>
          <Link to='/'>
            <span className='logo-red'>Stay</span><span className='logo-blue'>Informed</span>
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
