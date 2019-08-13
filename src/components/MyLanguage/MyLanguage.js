import React from 'react';
import UserContext from '../../contexts/UserContext';

class MyLanguage extends React.Component {

  static contextType = UserContext;

  render(){
    return <>{this.props.language && <h2>{this.props.language.name}</h2>}</> 
  }
}

export default MyLanguage;