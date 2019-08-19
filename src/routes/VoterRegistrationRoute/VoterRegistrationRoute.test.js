import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import VoterRegistrationRoute from './VoterRegistrationRoute';


it('renders without crashing', () => {
  const div = document.createElement('div')
  
  ReactDOM.render(
    // <BrowserRouter>
      <VoterRegistrationRoute />
    // </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
