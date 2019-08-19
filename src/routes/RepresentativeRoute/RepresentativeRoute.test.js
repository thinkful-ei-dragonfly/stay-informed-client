import React from 'react'
import ReactDOM from 'react-dom'
import RepresentativeRoute from './RepresentativeRoute'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
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
