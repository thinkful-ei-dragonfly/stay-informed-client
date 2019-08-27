import React from 'react';
import './Spinner.scss';
import MoneySpinner from './money-spinner.json'
import Lottie from 'react-lottie';

export default function Spinner () {

const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: MoneySpinner,
    };

  return (
    <div className='spinner-div' >
      <Lottie className='lottie-player' options={defaultOptions}/>
      <p>It takes a little while to count this much money, we'll finish in just a second.</p>
    </div>
  )
}
