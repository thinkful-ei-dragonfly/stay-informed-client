import React from 'react'
import ReactDOM from 'react-dom'
import ContribsChart from './ContribsChart'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContribsChart />, div);
  ReactDOM.unmountComponentAtNode(div);
 });