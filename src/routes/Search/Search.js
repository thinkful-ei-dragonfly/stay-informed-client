import React, { Component } from 'react';
import { Input, Required, Label } from '../../components/Form/Form';
import UserContext from '../../contexts/UserContext';
import Button from '../../components/Button/Button';
import './Search.scss';

class Search extends Component {
  static defaultProps = {
    location: {},
    history: {
    push: () => {},
  },
};

  static contextType = UserContext;
  state = {
    error: null
  };
  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.clearError();
    const { street, city, state, zip } = ev.target;

    if (zip.length > 5 || typeof zip !== 'number') {
      debugger;
    }
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
    if (!this.state.error) {
      this.handleSuccessfulSearch();
    }
  };

  handleSuccessfulSearch = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }
  componentDidMount() {
    this.firstInput.current.focus();
  }

  /* Render an input notification if zip entered is >5 digits */
  limitDigits(e) {
    e.preventDefault();
    let zipString = e.target.value.toString()
    if (zipString.length > 5 || isNaN((e.target.value)) ) {
      this.setState({ error: 'Please enter a 5 digit zip code.'})
    } else {
      this.setState({ error: null }) // TODO REDUNDANT? OVERHEAD?
    }
  }

  render() {
    let streetDefault = '';
    let cityDefault = '';
    let stateDefault = '';
    let zipDefault = '';
    let states = ['AK', 'AL', 'AR', 'AS', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
    'ME', 'MI', 'MN', 'MO', 'MP', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UM',
    'UT', 'VA', 'VI', 'VT', 'WA', 'WI', 'WV', 'WY']
    let statesArray = states.map(state => {
        return <option value={state} className='optionValue' key={state}>{state}</option>
    })
    if (this.context.user.address) {
      streetDefault = this.context.user.address.split(',')[0].trim();
      cityDefault = this.context.user.address.split(',')[1].trim();
      stateDefault = this.context.user.address.split(',')[2].trim();
      zipDefault = this.context.user.address.split(',')[3].trim();
      statesArray = states.map(state => {
        if (state === stateDefault) {
        return <option value={state} className='optionValue' key={state}> {state}</option>
        }
        return <option value={state} className='optionValue' key={state}> {state}</option>
      })
    } else {
      statesArray.push(<option value='placeholder' className='placeholderOption' disabled hidden key='placeholder'>State</option>)
    }
    const { error } = this.state;
    return (
      <div className='search-wrapper'>
        <section className='search-text'>
          <h2 className='title'>Search your representatives</h2>
        </section>
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <section className="form-fields">
          <Label htmlFor="street">
            Street
            <Required />
          </Label>
          <Input
            ref={this.firstInput}
            id="search-street-input"
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
            id="search-city-input"
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
          <select name="state"
            id="search-state-input"
            required
            defaultValue={this.context.state || 'placeholder'}
            >

            {statesArray}
            </select>

        </section>
        <section className="form-fields">
          <Label htmlFor="zip">
            Zip Code
            <Required />
          </Label>
          <Input
            id="search-zip-input"
            name="zip"
            maxlength="5"
            pattern="[0-9]{5}"
            type='number'
            placeholder={zipDefault}
            onChange={(e) => this.limitDigits(e)}
            required
          />
        </section>
        <div>
          <Button
            className='submit'
            type="submit">Search</Button>
        </div>
      </form>
    </div>
    );
  }
}

export default Search;
