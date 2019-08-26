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
    isStreetValidErr: null,
    isStateValidErr: null,
    isCityValidErr: null,
    isZipValidErr: null,
  };
  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.clearError();
    const { street, city, state, zip } = ev.target;

    // Only render a lack of State selection or too short zip code error message
    // if the submit button has actually been clicked
    if(zip.value.length < 5){
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
        });
      }
      if (!this.state.error) {
        this.handleSuccessfulSearch();
      }
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

  render() {
    let streetDefault = '';
    let cityDefault = '';
    let stateDefault = '';
    let zipDefault = '';
    let states = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DC', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD',
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
      statesArray.push(<option value='placeholder' className='placeholderOption' hidden key='placeholder'>State</option>)
    }
    const { isStreetValidErr, isCityValidErr, isStateValidErr, isZipValidErr } = this.state;
    let isAllValid = !isStreetValidErr && !isCityValidErr && !isStateValidErr && !isZipValidErr;
    return (
      <div className='search-wrapper'>
        <section className='search-text'>
          <h2 className='title'>Search your representatives</h2>
        </section>
      <form className="SearchForm" onSubmit={this.handleSubmit}>
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
            id="search-street-input"
            name="street"
            placeholder={streetDefault}
            onChange={(e) => this.isStreetValid(e)}
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
            onChange={(e) => this.isCityValid(e)}
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
            onChange={(e) => this.isStateValid(e)}
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
            type='number'
            placeholder={zipDefault}
            onChange={(e) => this.isZipValid(e)}
            required
          />
        </section>
        <div>
          <Button
            disabled={(!isAllValid)}
            className={`submit${!isAllValid ? ` btn-disabled` : ` active`}`}
            type="submit">Search</Button>
        </div>
      </form>
    </div>
    );
  }
}

export default Search;