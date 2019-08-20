import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Button from './Button'

describe(`Button component`, () => {
  it('renders a form.Button by default', () => {
    const wrapper = shallow(<Button />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
