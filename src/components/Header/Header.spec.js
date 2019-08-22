import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Header from './Header'

describe(`Header component`, () => {
  it('renders a form.Header by default', () => {
    const wrapper = shallow(<Header />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
