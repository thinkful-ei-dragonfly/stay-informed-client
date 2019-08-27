import React from 'react'
import ReactDOM from 'react-dom'
import RegistrationRoute from './LandingPage'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <RegistrationRoute ></RegistrationRoute>
    </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
