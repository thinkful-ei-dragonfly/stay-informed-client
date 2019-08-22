import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App'

describe(`App component`, () => {
  it('renders a form.App by default', () => {
    const wrapper = shallow(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
