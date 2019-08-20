import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ContribsChart from './ContribsChart'

describe(`ContribsChart component`, () => {
  it('renders a form.ContribsChart by default', () => {
    const wrapper = shallow(<ContribsChart />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
