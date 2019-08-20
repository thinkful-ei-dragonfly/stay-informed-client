import React from 'react';
import './NewsItem.css'

function NewsItem(props) {
  return (
    <li>
      <p>{props.article.source.name}</p>
      <img className='thumbnail' src={props.article.urlToImage} alt='related to headline'/>
      <a href={props.article.url}>
        <h2>{props.article.title}</h2>
      </a>
      <p>{props.article.description}</p>
    </li>
  );
}

export default NewsItem;

