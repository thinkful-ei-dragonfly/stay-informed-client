import React from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './ErrorDisplay.scss'


class ErrorDisplay extends React.Component {

  static contextType = UserContext;

  render() {
    return (
      <>
        <div className='error'>
          <h3>{this.context.error.error}</h3>
        </div>
        <Link to='/search'>
            <Button>Try Searching Again</Button>
        </Link>
      </>
    )
  }
}

export default ErrorDisplay;