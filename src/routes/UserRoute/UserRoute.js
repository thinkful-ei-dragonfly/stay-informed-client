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
    error: null,
  };

  static contextType = UserContext;
  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    const { street, city, state, zip } = ev.target;
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
      });
    }
    this.updateAddress(address)
  }

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
    }).catch(e=>this.context.setError(e.error));
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
    const error = this.state.error || this.context.error;
    return (
      <div className='update-wrapper'>
        <section className='update-text'>
          <h2 className='title'>Update your address</h2>
        </section>
        <form className="UpdateForm" onSubmit={this.handleSubmit} >
          <div role="alert">{error && <p>{error}</p>}</div>
          <section className="form-fields">
            <Label htmlFor="street">
              Street
            <Required />
            </Label>
            <Input
              ref={this.firstInput}
              id="update-street-input"
              name="street"
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
              placeholder={zipDefault}
              required
            />
          </section>
          <div>
            <Button
              className='submit'
              type="submit">Update Address</Button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserRoute