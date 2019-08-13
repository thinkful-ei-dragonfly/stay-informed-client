import React from 'react';
import UserContext from '../../contexts/UserContext';
import './WordList.css'

export default class WordList extends React.Component {

  static contextType = UserContext;
  
  renderWords() {
    const wordsArr = this.props.words.map((word, i) => {
      return (
      <li key={i}>
        <h4>{word.original}</h4>
        <p>correct answer count: {word.correct_count}</p>
        <p>incorrect answer count: {word.incorrect_count}</p>
      </li>);
    });
    return wordsArr;
  }

  render() {
    return (<>{this.props.words && <ul>{this.renderWords()}</ul>}</>)
  } 
}
