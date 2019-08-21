import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import NotFoundRoute from './NotFoundRoute';

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <NotFoundRoute ></NotFoundRoute>
   </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
