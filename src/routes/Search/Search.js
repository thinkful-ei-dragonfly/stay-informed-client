import React, { Component } from 'react';
import { Input, Required, Label } from '../../components/Form/Form';
import UserContext from '../../contexts/UserContext';
import Button from '../../components/Button/Button';
import RepresentativeService from '../../services/representatives-service';
import './Search.css';

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

    // This is the initial request to the backend.
    // The backend will make requests to Civics, ProPublica, and openSecrets and the response will include ALL of that stuf.
    RepresentativeService.getReps(this.context.user.address)

      .then(res => {
        if (res.state) {
          this.context.setUserState(res.state.toUpperCase());
        }
        if (res.district) {
          this.context.setUserDistrict(res.district);
        }
        if (res.representatives) {
          this.context.setRepresentatives(res.representatives);
        }

      })
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
    // Idea: If there's a current user, we should pre-populate these fields with the this.context.user.address
    // We would split the string at ',' and then set the defaultValue={street}
    // For next time
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
      <form className="SearchForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p>{error}</p>}</div>
        <h3>Enter your address</h3>
        <section className="SearchFormStreet">
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
        <section className="SearchFormCity">
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
        <section className="SearchFormState">
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
        <section className="SearchFormZip">
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
          <Button type="submit">Search</Button>
        </footer>
      </form>
    );
  }
}

export default Search;
