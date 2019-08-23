import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.scss'
import UserContext from '../../contexts/UserContext';

class RegistrationForm extends Component {
  static contextType = UserContext
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password, street, city, state, zip } = ev.target
    const address = `${street.value}, ${city.value}, ${state.value}, ${zip.value}`
    let loginUsername

    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
      address,
    })
      .then(user => {
        loginUsername = user.username
      })
      .then(response => {
        AuthApiService.postLogin({
          username: loginUsername,
          password: password.value,
        })
          .then(res => {
            name.value = ''
            username.value = ''
            password.value = ''
            street.value = ''
            city.value = ''
            state.value = ''
            zip.value = ''
            this.context.processLogin(res.authToken)
          })
          .catch(res => {
            this.setState({ error: res.error })
          })
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
      <>
        <form
          className='RegistrationForm'
          onSubmit={this.handleSubmit}
        >
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <section className='form-fields'>
            <Label
              className='small'
              htmlFor='name'>
              Name<Required />
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </section>
          <section className='form-fields'>
            <Label
              className='small'
              htmlFor='username'>
              Username<Required />
            </Label>
            <Input
              id='registration-username-input'
              name='username'
              required
            />
          </section>
          <section className='form-fields' >
            <Label
              className='small'
              htmlFor='street'>
              Street Address<Required />
            </Label>
            <Input
              ref={this.firstInput}
              id='registration-street-input'
              name='street'
              required
            />
          </section>
          <section className='form-fields' >
            <Label
              className='small'
              htmlFor='city'>
              City<Required />
            </Label>
            <Input
              id='registration-city-input'
              name='city'
              required
            />
          </section>
          <section className='form-fields' >
            <Label
              className='small'
              htmlFor='state'>
              State<Required />
            </Label>
            <Input
              id='registration-state-input'
              name='state'
              required
            />
          </section>
          <section className='form-fields' >
            <Label
              className='small'
              htmlFor='zip'>
              Zip Code<Required />
            </Label>
            <Input
              id='registration-zip-input'
              name='zip'
              required
            />
          </section>
          <section className='form-fields'>
            <Label
              className='small'
              htmlFor='password'>
              Password<Required />
            </Label>
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </section>
          <section className='submit-links'>
            <Button
              className='submit'
              type='submit'>
              Sign Up
            </Button>
            {' '}
            <Link
              className='login-redirect'
              to='/login'>Already have an account?</Link>
          </section>
        </form>

      </>
    )
  }
}

export default RegistrationForm
