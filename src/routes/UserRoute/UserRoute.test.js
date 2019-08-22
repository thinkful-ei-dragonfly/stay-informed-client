import React from 'react'
import ReactDOM from 'react-dom'
import UserRoute from './UserRoute'
import { BrowserRouter } from 'react-router-dom'


it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <UserRoute />
    </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
