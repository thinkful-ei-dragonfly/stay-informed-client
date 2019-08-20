import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import LoginRoute from './LoginRoute'

describe(`LoginRoute component`, () => {
  it('renders a form.LoginRoute by default', () => {
    const wrapper = shallow(<LoginRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
