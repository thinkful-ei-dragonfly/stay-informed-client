import React, { Component } from 'react';
import { Input, Required, Label } from '../../components/Form/Form';
import UserContext from '../../contexts/UserContext'
import AuthApiService from '../../services/auth-api-service'
import Button from '../../components/Button/Button';
import './UserRoute.scss'

class UserRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
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
    const { isStreetValidErr, isCityValidErr, isStateValidErr, isZipValidErr } = this.state;

    // Only render a lack of State selection or too short zip code error message
    // if the submit button has actually been clicked
    if (zip.value.length < 5) {
      this.setState({isZipValidErr: 'Zip code has too few digits - must be five digits.'})
    }
    else if(state.value === 'placeholder'){
      this.setState({isStateValidErr: 'Please select a State.'})
    }
    else {
      const address = `${street.value}, ${city.value}, ${state.value}, ${
        zip.value
      }`;

      if (this.context.user) {
        this.context.setUser({
          ...this.context.user,
          address
        });
      } else {
        this.context.setUser({
          address
        }).then(() => {
          if (!isStreetValidErr && !isCityValidErr && !isStateValidErr && !isZipValidErr ) {
            this.updateAddress(address)
          }
        })
      }  
    }
  };

  isStreetValid = (e) => {
    e.preventDefault();
    let street = e.target.value;
    if (typeof street !== 'string' || !street.match(/^[0-9a-zA-Z #]+$/)) {
      this.setState({isStreetValidErr: 'Street must contain only alphanumeric text.'})
    } else if (street === '' || street === null) {
      this.setState({ isStreetValidErr: 'Please enter a street.' })
    } else {
      this.setState( { isStreetValidErr: null } )
    }
  }

  isCityValid = (e) => {
    e.preventDefault();
    let city = e.target.value;
    if (typeof city !== 'string' || !city.match(/^[a-zA-Z ]+$/)) {
      this.setState({isCityValidErr: 'City must contain only alphabetic text.'})
    } else if (city === '' || city === null) {
      this.setState({ isCityValidErr: 'Please enter a city.' })
    } else {
      this.setState( { isCityValidErr: null } )
    }
  }

  isStateValid = (e) => {
    e.preventDefault();
    let state = e.target.value;
    if (state === 'placeholder') {
      this.setState({ isStateValidErr: 'Please enter a State.' })
    } else {
      this.setState( { isStateValidErr: null } )
    }
  }

  /* Render an input notification if zip entered is >5 digits */
  isZipValid = (e) => {
    e.preventDefault();
    let zipString = e.target.value.toString()
    if (zipString.length > 5 ) {
      this.setState({ isZipValidErr: 'Zip code cannot be larger than 5 digits.'})
    } else {
      this.setState({ isZipValidErr: null })
    }
  };

  fetchAddress = () => {
    AuthApiService.getUserAddress(this.context.user.id).then(res => {
      if (res) {
        this.setState({ address: res[0].address })
      }
    })
  }

  updateAddress = (newAddress) => {
    AuthApiService.postNewAddress(this.context.user.id, newAddress).then(res => {
      if (res) {
        this.setState({ address: res[0].address })
      }
      this.handleSuccessfulUpdate();
    }).catch(e=>this.setState({updateError:e.error}));
  }

  handleSuccessfulUpdate = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }
  componentDidMount() {
    this.firstInput.current.focus();
    this.fetchAddress()
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
  
    // merged here
    const { isStreetValidErr, isCityValidErr, isStateValidErr, isZipValidErr, updateError} = this.state;

    // TODO is this.context.error a string or an object?
    const error = updateError || this.context.error;
    let isAllValid = !isStreetValidErr && !isCityValidErr && !isStateValidErr && !isZipValidErr && !error;

    return (
      <div className='update-wrapper'>
        <section className='update-text'>
          <h2 className='title'>Update your address</h2>
        </section>
          <form className="UpdateForm" onSubmit={this.handleSubmit} >
          <div role="alert">{error && <p>{error}</p>}</div>          
          <div role="alert">{isStreetValidErr && <p>{isStreetValidErr}</p>}</div>
          <div role="alert">{isCityValidErr && <p>{isCityValidErr}</p>}</div>
          <div role="alert">{isStateValidErr && <p>{isStateValidErr}</p>}</div>
          <div role="alert">{isZipValidErr && <p>{isZipValidErr}</p>}</div>

          <section className="form-fields">
            <Label htmlFor="street">
              Street
            <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="update-street-input"
              name="street"
              onChange={(e) => this.isStreetValid(e)}
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
              onChange={(e) => this.isCityValid(e)}
              placeholder={cityDefault}
              required
            />
          </section>
          <section className="form-fields">
            <Label htmlFor="state">
              State
            <Required />
            </Label>
            <Input
              id="update-state-input"
              name="state"
              onChange={(e) => this.isStateValid(e)}
              placeholder={stateDefault}
              required
            />
          </section>
          <section className="form-fields">
            <Label htmlFor="zip">
              Zip Code
            <Required />
            </Label>
            <Input
              id="update-zip-input"
              name="zip"
              onChange={(e) => this.isZipValid(e)}
              placeholder={zipDefault}
              required
            />
          </section>
          <div>
            <Button
              disabled={(!isAllValid)}
              className={`submit${!isAllValid ? ` btn-disabled` : ` active`}`}
              type="submit">Update Address</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserRoute