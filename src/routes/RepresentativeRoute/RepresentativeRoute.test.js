import React from 'react'
import ReactDOM from 'react-dom'
import RepresentativeRoute from './RepresentativeRoute'
import { BrowserRouter } from 'react-router-dom'

/* Enzyme is currently unable to test with React context  */
it.skip('renders without crashing', () => {
  const div = document.createElement('div')
  const match = { 
    params: {
      id: 1234
    }
  };
  ReactDOM.render(
    <BrowserRouter>
      <RepresentativeRoute match={match} ></RepresentativeRoute>
   </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
