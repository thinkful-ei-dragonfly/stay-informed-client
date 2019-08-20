import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import AllOtherRoute from './AllOtherRoute'

describe(`AllOtherRoute component`, () => {
  it('renders a form.AllOtherRoute by default', () => {
    const wrapper = shallow(<AllOtherRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
