import React from 'react';
import './NewsItem.css'

function NewsItem(props) {
  const date = new Date(props.article.publishedAt).toDateString();

  return (
    <li className='articleThumbnail'>
      <a href={props.article.url} target="_blank" rel="noopener noreferrer">
        {props.article.urlToImage && <img className='articleImage' src={props.article.urlToImage} alt='related to headline'/>}
        <h2 className='articleTitle'>{props.article.title}</h2>
      </a>
      <p className='articleSource'>{props.article.source.name}</p>
      <p className='articleDescription'>{props.article.description}</p>
      <p className='articlePublished'>Published: {date}</p>
    </li>
  );
}

export default NewsItem;
