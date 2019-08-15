import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password, street, city, state, zip } = ev.target
    const address = `${street.value}, ${city.value}, ${state.value}, ${zip.value}`
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
      address,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        street.value = ''
        city.value = ''
        state.value = ''
        zip.value = ''
        this.props.onRegistrationSuccess(user)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='RegistrationForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <section className='RegistrationForm'>
          <Label htmlFor='registration-name-input'>
            Enter your name<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </section>
        <section>
          <Label htmlFor='registration-username-input'>
            Choose a username<Required />
          </Label>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </section>
        <section className='RegistrationFormStreet'>
          <Label htmlFor='registration-street'>
            Street Address<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='registration-street-input'
            name='street'
            required
          />
        </section>
        <section className='RegistrationFormCity'>
          <Label htmlFor='registration-city'>
            City<Required />
          </Label>
          <Input
            id='registration-city-input'
            name='city'
            required
          />
        </section>
        <section className='RegistrationFormState'>
          <Label htmlFor='registration-state'>
            State<Required />
          </Label>
          <Input
            id='registration-state-input'
            name='state'
            required
          />
        </section>
        <section className='RegistrationFormZip'>
          <Label htmlFor='registration-zip'>
            Zip Code<Required />
          </Label>
          <Input
            id='registration-zip-input'
            name='zip'
            required
          />
        </section>

        <section>
          <Label htmlFor='registration-password-input'>
            Choose a password<Required />
          </Label>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </section>
        <footer>
          <Button type='submit'>
            Sign up
          </Button>
          {' '}
          <Link to='/login'>Already have an account?</Link>
        </footer>
      </form>
    )
  }
}

export default RegistrationForm
