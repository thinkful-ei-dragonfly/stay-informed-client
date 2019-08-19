import React, { Component } from 'react'
import VoterRegistration from '../../components/VoterRegistration/VoterRegistration'

export default class VoterRegistrationRoute extends Component {
  

  render() { 
    return (
      <div className="voter-reg-route">
        <VoterRegistration></VoterRegistration>
      </div>
    );
  }
}