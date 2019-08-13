import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Button from '../../components/Button/Button';
import WordList from '../../components/WordList/WordList';
import MyLanguage from '../../components/MyLanguage/MyLanguage';
import LanguageContext from '../../contexts/LanguageContext';

class DashboardRoute extends Component {
  state = {
    language: null,
    words: null
  }

  componentDidMount() {
    this.context.fetchLanguage()
  }

  static contextType = LanguageContext;
  
  render() {
    return (
      <section className='container'>
          <MyLanguage language={this.context.language}/>
          <h3>Words to practice</h3>
          <WordList words={this.context.words}/>
          <Link to='/learn'>
            <Button type='button'>
              Start practicing
            </Button>
          </Link>
          {this.context.language && (<p>Total correct answers: {this.context.language.total_score}</p>) }
      </section>)
  }
}

export default DashboardRoute
