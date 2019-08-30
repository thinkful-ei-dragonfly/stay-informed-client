import React, { Component } from 'react';
import { Input, Required, Label } from '../../components/Form/Form';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Button from '../../components/Button/Button';
import './UserRoute.scss';

class UserRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  };

  state = {
    updateError: null,
    isStreetValidErr: null,
    isStateValidErr: null,
    isCityValidErr: null,
    isZipValidErr: null,
  };

  static contextType = UserContext;
  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.clearError();
    const { street, city, state, zip } = ev.target;
    const {
      isStreetValidErr,
      isCityValidErr,
      isStateValidErr,
      isZipValidErr,
      error,
    } = this.state;

    // Only render a lack of State selection or too short zip code error message
    // if the submit button has actually been clicked
    if (zip.value.length < 5) {
      this.setState({
        isZipValidErr: 'Zip code has too few digits - must be five digits.',
      });
    } else {
      const address = `${street.value}, ${city.value}, ${state.value}, ${zip.value}`;

      if (this.context.user) {
        this.context.setUser({
          ...this.context.user,
          address,
        });
      } else {
        this.context.setUser({
          address,
        });
      }
      if (
        !isStreetValidErr &&
        !isCityValidErr &&
        !isStateValidErr &&
        !isZipValidErr &&
        !error
      ) {
        this.updateAddress(address);
      }
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

  handleUnfoundClick = () => {
    // Reset error on unfound district notif button click to reset active submit button
    this.setState({ updateError: null });
  };

  fetchAddress = () => {
    AuthApiService.getUserAddress(this.context.user.id).then(res => {
      if (res) {
        this.setState({ address: res[0].address });
      }
    });
  };

  updateAddress = newAddress => {
    AuthApiService.postNewAddress(this.context.user.id, newAddress)
      .then(res => {
        if (res) {
          this.setState({ address: res[0].address });
        }
        this.handleSuccessfulUpdate();
      })
      .catch(e => this.setState({ updateError: e.error }));
  };

  handleSuccessfulUpdate = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/dashboard';
    history.push(destination);
  };
  componentDidMount() {
    this.firstInput.current.focus();
    this.fetchAddress();
  }

  render() {
    let streetDefault = '';
    let cityDefault = '';
    let stateDefault = '';
    let zipDefault = '';
    if (this.state.address) {
      streetDefault = this.state.address.split(',')[0].trim();
      cityDefault = this.state.address.split(',')[1].trim();
      stateDefault = this.state.address.split(',')[2].trim();
      zipDefault = this.state.address.split(',')[3].trim();
    }

    // build states dropdown html options
    let states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
    'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
    'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

    let defaultStateIndex = states.indexOf(stateDefault);
    let stateOptions = states.map((state, idx) => {
      return <option value={state} className='optionValue' key={idx}>{state}</option>
    })
    // add selected attribute to the user's current stored State so that it opens on user's current State
    stateOptions[defaultStateIndex] = <option value={stateDefault} className='optionValue' key={defaultStateIndex} selected>{stateDefault}</option>

    const {
      isStreetValidErr,
      isCityValidErr,
      isStateValidErr,
      isZipValidErr,
      updateError,
    } = this.state;

    const error = updateError;
    let isAllValid =
      !isStreetValidErr &&
      !isCityValidErr &&
      !isStateValidErr &&
      !isZipValidErr &&
      !error;

    return (
      <div className="update-wrapper">
        {error ? (
            <div className="unfound-district-alert">
              <p className="unfound-district-msg">Uh oh, we couldn't locate your district. Please try again.</p>
              <button className="unfound-district-btn" onClick={this.handleUnfoundClick}>Try again</button>
            </div>
          ) : (
            ''
          )}
        <section className="update-text">
          <h2 className="title">Update your address</h2>
        </section>
        <form className="UpdateForm" onSubmit={this.handleSubmit}>
          <div role="alert" className='alert'>{isStreetValidErr && <p>{isStreetValidErr}</p>}</div>
          <div role="alert" className='alert'>{isCityValidErr && <p>{isCityValidErr}</p>}</div>
          <div role="alert" className='alert'>{isStateValidErr && <p>{isStateValidErr}</p>}</div>
          <div role="alert" className='alert'>{isZipValidErr && <p>{isZipValidErr}</p>}</div>

          <section className="form-fields">
            <Label htmlFor="street">
              Street
              <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="update-street-input"
              name="street"
              onChange={e => this.isStreetValid(e)}
              placeholder={streetDefault}
              required
            />
          </section>
          <section className="form-fields">
            <Label htmlFor="city">
              City
              <Required />
            </Label>
            <Input
              id="update-city-input"
              name="city"
              onChange={e => this.isCityValid(e)}
              placeholder={cityDefault}
              required
            />
          </section>
          <section className="form-fields">
            <Label htmlFor="state">
              State
              <Required />
            </Label>
            <select name="state"
            id="update-state-input"
            required
            onChange={(e) => this.isStateValid(e)}
            >
            {stateOptions}
            </select>
          </section>
          <section className="form-fields">
            <Label htmlFor="zip">
              Zip Code
              <Required />
            </Label>
            <Input
              id="update-zip-input"
              name="zip"
              onChange={e => this.isZipValid(e)}
              placeholder={zipDefault}
              required
            />
          </section>
          <div>
            <Button
              disabled={!isAllValid}
              className={`submit${!isAllValid ? ` btn-disabled` : ` active`}`}
              type="submit"
            >
              Update Address
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserRoute;
