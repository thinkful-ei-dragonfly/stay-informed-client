import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import NotFoundRoute from './NotFoundRoute'

describe(`NotFoundRoute component`, () => {
  it('renders a form.NotFoundRoute by default', () => {
    const wrapper = shallow(<NotFoundRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
