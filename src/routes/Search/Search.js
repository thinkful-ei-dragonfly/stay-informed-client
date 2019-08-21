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
  state = { error: null };
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

      this.handleSuccessfulSearch();

    ;
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
    if (this.context.user.address) {
      streetDefault = this.context.user.address.split(',')[0].trim();
      cityDefault = this.context.user.address.split(',')[1].trim();
      stateDefault = this.context.user.address.split(',')[2].trim();
      zipDefault = this.context.user.address.split(',')[3].trim();
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
          <Label htmlFor="search-street">
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
          <Label htmlFor="search-city">
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
          <Label htmlFor="search-state">
            State
            <Required />
          </Label>
          <Input
            id="search-state-input"
            name="state"
            placeholder={stateDefault}
            required
          />
        </section>
        <section className="form-fields">
          <Label htmlFor="search-zip">
            Zip Code
            <Required />
          </Label>
          <Input
            id="search-zip-input"
            name="zip"
            placeholder={zipDefault}
            required
          />
        </section>
        <footer>
          <Button
            className='submit'
            type="submit">Search</Button>
        </footer>
      </form>
    </div>
    );
  }
}

export default Search;
