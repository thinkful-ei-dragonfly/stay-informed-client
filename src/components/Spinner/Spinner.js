import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Spinner.css';

export default function Spinner () {
  return (
    <div className='spinner-div'> 
      <FontAwesomeIcon className='loader' icon='spinner' />
      <p>Please wait while we find your representatives</p>
    </div>
  )
} 