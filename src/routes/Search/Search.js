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
    error: null,
    isDisabled: false
  };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.clearError();
    const { street, city, state, zip } = ev.target;

    // removing unnecessary commas since our search route splits the address returned by the database
    let updatedStreet = street.value.split(',').join('');

    // validating zip length if it's under 5 characters
    if (zip.value.length < 5) {
      console.log('setting state because zip is less than 5 characters');
      this.setState({
        error: `Your zipcode is less than 5 characters. Please update your zipcode and submit again`
      })

    }

    if (state.value === 'placeholder') {
      this.setState({
        error: "Please select a state"
      })
    }


    const address = `${updatedStreet}, ${city.value}, ${state.value}, ${zip.value}`;

    // if the zipcode is correct & a valid state was selected
    if (zip.value.length === 5 && state.value !== 'placeholder') {
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
        this.handleSuccessfulSearch();

    };
  };

  handleSuccessfulSearch = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/dashboard'
    history.push(destination)
  }
  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {
    let streetDefault = '';
    let cityDefault = '';
    let stateDefault = '';
    let zipDefault = '';
    let states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
    'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX',
    'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY']
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
            maxLength="5"
            pattern="[0-9]{5}"
            type='number'
            placeholder={zipDefault}
            required
          />
        </section>
        <div>
          {this.state.isDisabled
            ? (
              <Button
                className='submit disabled'
                disabled
                type="submit">Search</Button>
            )
            : (
              <Button
                className='submit'
                type="submit">Search</Button>)}

        </div>
      </form>
    </div>
    );
  }
}

export default Search;
