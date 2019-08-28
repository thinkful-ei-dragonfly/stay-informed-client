import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Spinner from './Spinner'

describe(`Spinner component`, () => {
  it('renders a Spinner', () => {
    const wrapper = shallow(<Spinner />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
