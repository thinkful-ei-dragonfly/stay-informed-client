import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Spinner from './Spinner'
import Lottie from 'react-lottie';

describe(`Spinner component`, () => {
  it('renders a Spinner', () => {
    const wrapper = shallow(<Spinner />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
