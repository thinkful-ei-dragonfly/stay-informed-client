import React from 'react';
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import VoterRegistration from './VoterRegistration'

describe(`VoterRegistration component`, () => {
  it('renders a form.VoterRegistration by default', () => {
    const wrapper = shallow(<VoterRegistration />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
