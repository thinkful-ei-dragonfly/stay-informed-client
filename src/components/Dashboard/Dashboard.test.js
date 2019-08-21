import React from 'react';
import Dashboard from './Dashboard'
import ReactDOM from 'react-dom'

describe(`Dashboard component`, () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Dashboard />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
});