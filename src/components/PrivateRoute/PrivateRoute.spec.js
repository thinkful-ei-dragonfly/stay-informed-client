import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PrivateRoute from './PrivateRoute'

describe(`PrivateRoute component`, () => {
  it('renders a form.PrivateRoute by default', () => {
    const wrapper = shallow(<PrivateRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
