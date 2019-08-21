import React from 'react';
import './NewsItem.css'

function NewsItem(props) {
  const date = new Date(props.article.publishedAt).toDateString();
 
  return (
    <li>
      <p>{props.article.source.name}</p>
      {props.article.urlToImage && <img className='thumbnail' src={props.article.urlToImage} alt='related to headline'/>}
      <a href={props.article.url}>
        <h2>{props.article.title}</h2>
      </a>
      <p>{props.article.description}</p>
      <p>Published: {date}</p>
    </li>
  );
}

export default NewsItem;

