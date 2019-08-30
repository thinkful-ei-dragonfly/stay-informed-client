import React from 'react';
import NewsItem from '../NewsItem/NewsItem';
import UserContext from '../../contexts/UserContext';

export default class NewsList extends React.Component {
  static contextType = UserContext;

  displayArticles(news){
    if(news){
    return news.map((article, idx) => <NewsItem key={idx} article={article}/>)
  }
    return;
  }

  render(){
    return (
      <section className='NewsList-wrapper'>
        <h2 className='title'>What's Going On</h2>
        <h3 className='subtitle'>Here are some articles that mention your representatives</h3>
        <ul className='NewsList'>
          {this.displayArticles(this.context.news)}
        </ul>
      </section>
    )
  }
}
