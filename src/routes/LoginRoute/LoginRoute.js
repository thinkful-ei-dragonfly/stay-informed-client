import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginRoute.scss'

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }

  render() {
    return (
      <section className='login-wrapper'>
        <h2 className='title'>Welcome back. Sign in</h2>

        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
      </section>
    );
  }
}

export default LoginRoute
