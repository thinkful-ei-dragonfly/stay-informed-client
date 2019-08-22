import React from 'react'
import ReactDOM from 'react-dom'
import RepresentativeList from './RepresentativeList'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  
  ReactDOM.render(
  <BrowserRouter>
    <RepresentativeList />
  </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
