import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Spinner.css';

library.add(faUser);

export default function Spinner () {
  return (
    <div className='spinner-div'> 
      <FontAwesomeIcon icon='user' />
      <p>Please wait while we find your representatives</p>
    </div>
  )
} 