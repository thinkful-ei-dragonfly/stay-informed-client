import React from 'react'
import ReactDOM from 'react-dom'
import VoterRegistration from './VoterRegistration'
import { BrowserRouter } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
      <VoterRegistration />
    </BrowserRouter>
  , div)
  ReactDOM.unmountComponentAtNode(div)
})
