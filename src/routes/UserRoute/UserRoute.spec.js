import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import UserRoute from './UserRoute'

describe(`UserRoute component`, () => {
  it('renders a form.UserRoute by default', () => {
    const wrapper = shallow(<UserRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
