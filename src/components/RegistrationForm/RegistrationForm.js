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

  state = {
    error: null
  }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password, street, city, state, zip } = ev.target

    // begin validation

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
            <select name="registration-state">
              <option value='placeholder' className='placeholderOption' selected disabled hidden>State</option>
              <option value="AL" className='optionValue'>AL</option>
              <option value="AK" className='optionValue'>AK</option>
              <option value="AZ" className='optionValue'>AZ</option>
              <option value="AR" className='optionValue'>AR</option>
              <option value="CA" className='optionValue'>CA</option>
              <option value="CO" className='optionValue'>CO</option>
              <option value="CT" className='optionValue'>CT</option>
              <option value="DE" className='optionValue'>DE</option>
              <option value="FL" className='optionValue'>FL</option>
              <option value="GA" className='optionValue'>GA</option>
              <option value="HI" className='optionValue'>HI</option>
              <option value="ID" className='optionValue'>ID</option>
              <option value="IL" className='optionValue'>IL</option>
              <option value="IN" className='optionValue'>IN</option>
              <option value="IA" className='optionValue'>IA</option>
              <option value="KS" className='optionValue'>KS</option>
              <option value="KY" className='optionValue'>KY</option>
              <option value="LA" className='optionValue'>LA</option>
              <option value="ME" className='optionValue'>ME</option>
              <option value="MD" className='optionValue'>MD</option>
              <option value="MA" className='optionValue'>MA</option>
              <option value="MI" className='optionValue'>MI</option>
              <option value="MN" className='optionValue'>MN</option>
              <option value="MS" className='optionValue'>MS</option>
              <option value="MO" className='optionValue'>MO</option>
              <option value="MT" className='optionValue'>MT</option>
              <option value="NE" className='optionValue'>NE</option>
              <option value="NV" className='optionValue'>NV</option>
              <option value="NH" className='optionValue'>NH</option>
              <option value="NJ" className='optionValue'>NJ</option>
              <option value="NM" className='optionValue'>NM</option>
              <option value="NY" className='optionValue'>NY</option>
              <option value="NC" className='optionValue'>NC</option>
              <option value="ND" className='optionValue'>ND</option>
              <option value="OH" className='optionValue'>OH</option>
              <option value="OK" className='optionValue'>OK</option>
              <option value="OR" className='optionValue'>OR</option>
              <option value="PA" className='optionValue'>PA</option>
              <option value="RI" className='optionValue'>RI</option>
              <option value="SC" className='optionValue'>SC</option>
              <option value="SD" className='optionValue'>SD</option>
              <option value="TN" className='optionValue'>TN</option>
              <option value="TX" className='optionValue'>TX</option>
              <option value="UT" className='optionValue'>UT</option>
              <option value="VT" className='optionValue'>VT</option>
              <option value="VA" className='optionValue'>VA</option>
              <option value="WA" className='optionValue'>WA</option>
              <option value="WV" className='optionValue'>WV</option>
              <option value="WI" className='optionValue'>WI</option>
              <option value="WY" className='optionValue'>WY</option>
            </select>

          </section>
          <section className='form-fields' >
            <Label
              className='small'
              type='number'
              maxLength="5"
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
