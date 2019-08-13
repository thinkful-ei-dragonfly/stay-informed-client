import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import './Search.css'

class Search extends Component {
  static defaultProps = {

  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { zipcode } = ev.target

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
        <div>
          <Label htmlFor='search-zipcode'>
            Enter your zipcode<Required />
          </Label>
          <Input
            ref={this.firstInput}
            id='search-zipcode-input'
            name='search'
            required
          />
        </div>
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
