import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import './RegistrationForm.scss';
import UserContext from '../../contexts/UserContext';

class RegistrationForm extends Component {
  static contextType = UserContext;
  static defaultProps = {
    onRegistrationSuccess: () => {},
  };

  state = {
    isRegistrationValidErr: null,
    isStreetValidErr: null,
    isCityValidErr: null,
    isStateValidErr: null,
    isZipValidErr: null,
    isNameValidErr: null,
    isUsernameValidErr: null,
    isPasswordValidErr: null,
  };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { name, username, password, street, city, state, zip } = ev.target;

    // begin validation
    // Only render a lack of State selection or too short zip code error message
    // if the submit button has actually been clicked
    if (zip.value.length < 5) {
      this.setState({
        isZipValidErr: 'Zip code has too few digits - must be five digits.',
      });
    } else if (state.value === 'placeholder') {
      this.setState({ isStateValidErr: 'Please select a State.' });
    } else {
      const address = `${street.value}, ${city.value}, ${state.value}, ${zip.value}`;
      let loginUsername;

      AuthApiService.postUser({
        name: name.value,
        username: username.value,
        password: password.value,
        address,
      })
        .then(user => {
          loginUsername = user.username;
        })
        .then(response => {
          AuthApiService.postLogin({
            username: loginUsername,
            password: password.value,
          })
            .then(res => {
              name.value = '';
              username.value = '';
              password.value = '';
              street.value = '';
              city.value = '';
              state.value = '';
              zip.value = '';
              this.context.processLogin(res.authToken);
            })
            .catch(res => {
              this.setState({ isRegistrationValidErr: res.error });
            });
        })
        .catch(res => {
          this.setState({ isRegistrationValidErr: res.error });
        });
    }
  };

  isNameValid = e => {
    e.preventDefault();
    let name = e.target.value;
    if (name === '' || name === null) {
      this.setState({ isNameValidErr: 'Please enter your name.' });
    } else if (typeof name !== 'string' || !name.match(/^[a-zA-Z ]+$/)) {
      this.setState({
        isNameValidErr: 'Name must contain only alphabetic text.',
      });
    } else {
      this.setState({ isNameValidErr: null });
    }
  };

  isUsernameValid = e => {
    e.preventDefault();
    let username = e.target.value;
    if (username === '' || username === null) {
      this.setState({ isUsernameValidErr: 'Please enter a username.' });
    } else if (typeof username !== 'string') {
      this.setState({ isUsernameValidErr: 'Username must contain text.' });
    } else {
      this.setState({ isUsernameValidErr: null });
    }
  };

  isPasswordValid = e => {
    e.preventDefault();
    let password = e.target.value;
    if (password === '' || password === null) {
      this.setState({ isPasswordValidErr: 'Please enter a password.' });
    } else if (typeof password !== 'string') {
      this.setState({ isPasswordValidErr: 'Password must contain text.' });
    } else {
      this.setState({ isPasswordValidErr: null });
    }
  };

  isStreetValid = e => {
    e.preventDefault();
    let street = e.target.value;
    if (typeof street !== 'string' || !street.match(/^[0-9a-zA-Z #]+$/)) {
      this.setState({
        isStreetValidErr: 'Street must contain only alphanumeric text.',
      });
    } else if (street === '' || street === null) {
      this.setState({ isStreetValidErr: 'Please enter a street.' });
    } else {
      this.setState({ isStreetValidErr: null });
    }
  };

  isCityValid = e => {
    e.preventDefault();
    let city = e.target.value;
    if (typeof city !== 'string' || !city.match(/^[a-zA-Z ]+$/)) {
      this.setState({
        isCityValidErr: 'City must contain only alphabetic text.',
      });
    } else if (city === '' || city === null) {
      this.setState({ isCityValidErr: 'Please enter a city.' });
    } else {
      this.setState({ isCityValidErr: null });
    }
  };

  isStateValid = e => {
    e.preventDefault();
    let state = e.target.value;
    if (state === 'placeholder') {
      this.setState({ isStateValidErr: 'Please enter a State.' });
    } else {
      this.setState({ isStateValidErr: null });
    }
  };

  /* Render an input notification if zip entered is >5 digits */
  isZipValid = e => {
    e.preventDefault();
    let zipString = e.target.value.toString();
    if (zipString.length > 5) {
      this.setState({
        isZipValidErr: 'Zip code cannot be larger than 5 digits.',
      });
    } else {
      this.setState({ isZipValidErr: null });
    }
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    const {
      isRegistrationValidErr,
      isStreetValidErr,
      isCityValidErr,
      isStateValidErr,
      isZipValidErr,
      isNameValidErr,
      isUsernameValidErr,
      isPasswordValidErr,
    } = this.state;
    let isAllValid =
      !isStreetValidErr &&
      !isCityValidErr &&
      !isStateValidErr &&
      !isZipValidErr &&
      !isRegistrationValidErr &&
      !isNameValidErr &&
      !isUsernameValidErr &&
      !isPasswordValidErr;

    return (
      <>
        <form className="RegistrationForm" onSubmit={this.handleSubmit}>
          <div role="alert">
            {isRegistrationValidErr && <p>{isRegistrationValidErr}</p>}
          </div>
          <div role="alert">{isNameValidErr && <p>{isNameValidErr}</p>}</div>
          <div role="alert">
            {isUsernameValidErr && <p>{isUsernameValidErr}</p>}
          </div>
          <div role="alert">
            {isPasswordValidErr && <p>{isPasswordValidErr}</p>}
          </div>
          <div role="alert">
            {isStreetValidErr && <p>{isStreetValidErr}</p>}
          </div>
          <div role="alert">{isCityValidErr && <p>{isCityValidErr}</p>}</div>
          <div role="alert">{isStateValidErr && <p>{isStateValidErr}</p>}</div>
          <div role="alert">{isZipValidErr && <p>{isZipValidErr}</p>}</div>
          <section className="form-fields">
            <Label className="small" htmlFor="name">
              Name
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="registration-name-input"
              name="name"
              onChange={e => this.isNameValid(e)}
              required
            />
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="username">
              Username
              <Required />
            </Label>
            <Input
              id="registration-username-input"
              name="username"
              onChange={e => this.isUsernameValid(e)}
              required
            />
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="street">
              Street Address
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="registration-street-input"
              name="street"
              onChange={e => this.isStreetValid(e)}
              required
            />
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="city">
              City
              <Required />
            </Label>
            <Input
              id="registration-city-input"
              name="city"
              onChange={e => this.isCityValid(e)}
              required
            />
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="state">
              State
              <Required />
            </Label>
            <select name="state" defaultValue="placeholder">
              <option
                value="placeholder"
                className="placeholderOption"
                disabled
                onChange={e => this.isStateValid(e)}
                hidden
              >
                State
              </option>
              <option value="AL" className="optionValue">
                AL
              </option>
              <option value="AK" className="optionValue">
                AK
              </option>
              <option value="AZ" className="optionValue">
                AZ
              </option>
              <option value="AR" className="optionValue">
                AR
              </option>
              <option value="CA" className="optionValue">
                CA
              </option>
              <option value="CO" className="optionValue">
                CO
              </option>
              <option value="CT" className="optionValue">
                CT
              </option>
              <option value="DE" className="optionValue">
                DE
              </option>
              <option value="FL" className="optionValue">
                FL
              </option>
              <option value="GA" className="optionValue">
                GA
              </option>
              <option value="HI" className="optionValue">
                HI
              </option>
              <option value="ID" className="optionValue">
                ID
              </option>
              <option value="IL" className="optionValue">
                IL
              </option>
              <option value="IN" className="optionValue">
                IN
              </option>
              <option value="IA" className="optionValue">
                IA
              </option>
              <option value="KS" className="optionValue">
                KS
              </option>
              <option value="KY" className="optionValue">
                KY
              </option>
              <option value="LA" className="optionValue">
                LA
              </option>
              <option value="ME" className="optionValue">
                ME
              </option>
              <option value="MD" className="optionValue">
                MD
              </option>
              <option value="MA" className="optionValue">
                MA
              </option>
              <option value="MI" className="optionValue">
                MI
              </option>
              <option value="MN" className="optionValue">
                MN
              </option>
              <option value="MS" className="optionValue">
                MS
              </option>
              <option value="MO" className="optionValue">
                MO
              </option>
              <option value="MT" className="optionValue">
                MT
              </option>
              <option value="NE" className="optionValue">
                NE
              </option>
              <option value="NV" className="optionValue">
                NV
              </option>
              <option value="NH" className="optionValue">
                NH
              </option>
              <option value="NJ" className="optionValue">
                NJ
              </option>
              <option value="NM" className="optionValue">
                NM
              </option>
              <option value="NY" className="optionValue">
                NY
              </option>
              <option value="NC" className="optionValue">
                NC
              </option>
              <option value="ND" className="optionValue">
                ND
              </option>
              <option value="OH" className="optionValue">
                OH
              </option>
              <option value="OK" className="optionValue">
                OK
              </option>
              <option value="OR" className="optionValue">
                OR
              </option>
              <option value="PA" className="optionValue">
                PA
              </option>
              <option value="RI" className="optionValue">
                RI
              </option>
              <option value="SC" className="optionValue">
                SC
              </option>
              <option value="SD" className="optionValue">
                SD
              </option>
              <option value="TN" className="optionValue">
                TN
              </option>
              <option value="TX" className="optionValue">
                TX
              </option>
              <option value="UT" className="optionValue">
                UT
              </option>
              <option value="VT" className="optionValue">
                VT
              </option>
              <option value="VA" className="optionValue">
                VA
              </option>
              <option value="WA" className="optionValue">
                WA
              </option>
              <option value="WV" className="optionValue">
                WV
              </option>
              <option value="WI" className="optionValue">
                WI
              </option>
              <option value="WY" className="optionValue">
                WY
              </option>
            </select>
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="zip">
              Zip Code
              <Required />
            </Label>
            <Input
              id="registration-zip-input"
              name="zip"
              type="number"
              onChange={e => this.isZipValid(e)}
              required
            />
          </section>
          <section className="form-fields">
            <Label className="small" htmlFor="password">
              Password
              <Required />
            </Label>
            <Input
              id="registration-password-input"
              name="password"
              type="password"
              onChange={e => this.isPasswordValid(e)}
              required
            />
          </section>
          <section className="submit-links">
            <Button
              disabled={!isAllValid}
              className={`submit${!isAllValid ? ` btn-disabled` : ` active`}`}
              type="submit"
            >
              Sign Up
            </Button>{' '}
            <Link className="login-redirect" to="/login">
              Already have an account?
            </Link>
          </section>
        </form>
      </>
    );
  }
}

export default RegistrationForm;
