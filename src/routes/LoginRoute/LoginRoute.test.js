import React from 'react'
import ReactDOM from 'react-dom'
import LoginRoute from './LoginRoute'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render( <LoginRoute />, div)
  ReactDOM.unmountComponentAtNode(div)
})
