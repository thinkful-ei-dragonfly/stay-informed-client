
import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext'
// import {Link} from 'react-router-dom';
// import Button from '../../components/Button/Button';

class UserRoute extends Component {
  state = {

  }

  static contextType = UserContext

  componentDidMount() {
    console.log(this.context.address)
  }

  render() {
    return (
      <section className='container'>
          <h3>...</h3>
      </section>
      );
  }
}

export default UserRoute
