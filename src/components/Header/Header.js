import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.scss'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='header-controls signed-in'>
        <Link
          className='header-user-name'
          to={`/user/${this.context.user.id}`}>
          {this.context.user.name}
        </Link>
        <nav role="navigation">
          <Link
            className="search-nav"
            to='/search'>
            Search New Address
          </Link>
          <Link
            className='logout'
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
      <div className='header-controls signed-out' >
        <nav role="navigation">
          <Link className='login-link'
            to='/login'>Login</Link>
          {''}
          <Link className='register-link'
            to='/register'>Sign up</Link>
        </nav>
      </div>
    )
  }

  render() {
    return (
      <header className='App-Header' role="banner">
        <h1 className='Header-Logo'>
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
