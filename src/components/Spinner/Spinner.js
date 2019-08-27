import React from 'react';
import './Spinner.scss';
import NewspaperSpinner from './newspaper-spinner.json'
import Lottie from 'react-lottie';

export default function Spinner () {

const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: NewspaperSpinner,
    };

  return (
    <div className='spinner-div' >
      <Lottie className='lottie-player' options={defaultOptions}/>
      <p>Please wait while we find your representatives</p>
    </div>
  )
}
