import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './VoterRegistration.scss'

export default class VoterRegistration extends Component {
  render() {
    return (
      <div className="reg-vote">
       <Link to="/dashboard" className="dash-link">Navigate back to dashboard</Link>
       <p class="loading">Loading...</p>
        <iframe
          title="Use this form to register to vote in your local, state, and national elections."
          src="https://register.rockthevote.com/?partner=1&source=ovrpage"
          width="100%"
          height="1500"
          marginHeight="0"
          frameBorder="0"
        />
      </div>
    );
  }
}
