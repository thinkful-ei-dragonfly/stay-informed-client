import React from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import { Link } from 'react-router-dom';
import './ErrorDisplay.scss'


class ErrorDisplay extends React.Component {

  static contextType = UserContext;

  render() {
    return (
      <section>
        <div className='error'>
          <h2 className='errorH2'>Something went wrong. {this.context.error.error}</h2>
        </div>

            <Button>
              <Link to='/search'>
                Try Searching Again
              </Link>
            </Button>

      </section>
    )
  }
}

export default ErrorDisplay;
