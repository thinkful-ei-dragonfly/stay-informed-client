import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import './RegistrationRoute.scss'


class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = (user) => {
    const { history } = this.props
    history.push(`/dashboard`)
  }

  render() {
    return (
      <section className='createFormDiv' id='createForm'>
        <h2 className='title'>Create a user profile, allowing you to check in on your elected officials. Contact them, see who contributes to their campaigns, and stay up-to-date on local goings-on.</h2>
        <div className='form-wrapper'>
          <h3 className='subtitle'>Sign up and stay informed</h3>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
      </section>
    );
  }
}

export default RegistrationRoute
