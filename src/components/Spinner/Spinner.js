import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Spinner.css';
// import lottie from 'lottie-web'
import NewspaperSpinner from './newspaper-spinner.json'
import Lottie from 'react-lottie';

// library.add(faUser);

export default function Spinner () {
//   lottie.loadAnimation({
//   container: ('#animationDiv'), // the dom element that will contain the animation
//   renderer: 'svg',
//   loop: true,
//   autoplay: true,
//   path: NewspaperSpinner // the path to the animation json
// });
// <FontAwesomeIcon icon='user' />
const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: NewspaperSpinner,

    };
debugger
  return (
    <div className='spinner-div' >
      <Lottie className='lottie-player' options={defaultOptions}/>
      <p>Please wait while we find your representatives</p>
    </div>
  )
}
