import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import VoterRegistrationRoute from './VoterRegistrationRoute'

describe(`VoterRegistrationRoute component`, () => {
  it('renders a form.VoterRegistrationRoute by default', () => {
    const wrapper = shallow(<VoterRegistrationRoute />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
