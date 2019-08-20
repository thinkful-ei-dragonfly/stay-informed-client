import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

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
      <section className='container'>
        <h2>StayInformed is an app that helps you cut the noise and gives you “just the facts” about your local and federal politicians.</h2>
        <h3>Sign up</h3>

        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </section>
    );
  }
}

export default RegistrationRoute
