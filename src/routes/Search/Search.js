import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../../components/Form/Form'
import UserContext from '../../contexts/UserContext'
import Button from '../../components/Button/Button'
import './Search.css'

class Search extends Component {
  static defaultProps = {

  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { street, city, state, zip } = ev.target
    const address = `${street.value}, ${city.value}, ${state.value}, ${zip.value}`
    const user = {
      username: 'anon',
      address,
    }
    this.context.user = user
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='SearchForm'
        onSubmit={this.handleSubmit}
      >
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <h3>Enter your address</h3>
        <section className='SearchFormStreet'>
          <Label htmlFor='search-street'>
            Street<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='search-street-input'
            name='street'
            required
          />
        </section>
        <section className='SearchFormCity'>
          <Label htmlFor='search-city'>
            City<Required />
          </Label>
          <Input
            id='search-city-input'
            name='city'
            required
          />
        </section>
        <section className='SearchFormState'>
          <Label htmlFor='search-state'>
            State<Required />
          </Label>
          <Input
            id='search-state-input'
            name='state'
            required
          />
        </section>
        <section className='SearchFormZip'>
          <Label htmlFor='search-zip'>
            Zip Code<Required />
          </Label>
          <Input
            id='search-zip-input'
            name='zip'
            required
          />
        </section>
        <footer>
          <Button type='submit'>
            Search
          </Button>
        </footer>
      </form>
    )
  }
}

export default Search
