import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import Search from './search.svg'
import Settings from './settings.svg'
import './Header.scss'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div className='header-controls signed-in'>
        <nav role="navigation">
          <Link
            className='header-user-name'
            to={`/user/${this.context.user.id}`}>
            <span className="full">{this.context.user.name}</span>
            <span className="mobile"><img src={Settings} alt='Settings'/></span>
          </Link>
          <Link
            className="search-nav"
            to='/search'>
            <span className="full">Quick Search</span>
            <span className="mobile"><img src={Search} alt='Search'/></span>
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
          <Link
            className="search-nav"
            to='/search'>
            <span className="full">Quick Search</span>
            <span className="mobile"><img src={Search} alt='Search'/></span>
          </Link>
          <Link className='login-link'
            to='/login'>
            Login
          </Link>
          {''}
          <Link className='register-link'
            to='/register'>
            <span className="full">Sign up</span>
            <span className="mobile">Sign up</span>
          </Link>
        </nav>
      </div>
    )
  }

  render() {
    return (
      <header className='appHeader' role="banner">
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
