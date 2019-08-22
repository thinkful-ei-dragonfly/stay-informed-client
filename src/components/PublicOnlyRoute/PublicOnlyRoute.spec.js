import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import PublicOnlyRoute from './PublicOnlyRoute'

describe(`PublicOnlyRoute component`, () => {
  it('renders a form.PublicOnlyRoute by default', () => {
    const wrapper = shallow(<PublicOnlyRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

})
