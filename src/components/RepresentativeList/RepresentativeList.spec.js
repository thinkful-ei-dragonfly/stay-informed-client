import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RepresentativeList from './RepresentativeList'

describe(`RepresentativeList component`, () => {
  it('renders a form.RepresentativeList by default', () => {
    const wrapper = shallow(<RepresentativeList />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
