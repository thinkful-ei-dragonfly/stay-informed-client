import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Spinner.css';

export default function Spinner () {
  return (
    <div className='spinner-div'> 
      <FontAwesomeIcon className='loader' icon='faSpinner' />
    </div>
  )
} 