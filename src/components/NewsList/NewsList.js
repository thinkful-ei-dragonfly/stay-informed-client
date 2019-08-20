import React from 'react';
import NewsItem from '../NewsItem/NewsItem';
import RepresentativeService from '../../services/representatives-service';
import UserContext from '../../contexts/UserContext';

export default class NewsList extends React.Component {
  static contextType = UserContext;

  displayArticles(news){
    if(news){
    return news.map((article, idx) => <NewsItem key={idx} article={article}/>)
  }
    return;
  }

  componentDidMount() {
    RepresentativeService.getNews()
      .then(res => res.json())
      .then(news => 
        this.context.setNews(news))
      .catch(error => this.context.setError(error));
  }

  render(){
    return (
      <div>
        <ul>
          {this.displayArticles(this.context.news)}
        </ul>
      </div>
    )
  }
}