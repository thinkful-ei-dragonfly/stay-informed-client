import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RegistrationRoute from './RegistrationRoute'

describe(`RegistrationRoute component`, () => {
  it('renders a form.RegistrationRoute by default', () => {
    const wrapper = shallow(<RegistrationRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
