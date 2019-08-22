import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewsItem from './NewsItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // make necessary contributions prop to pass in
  

  const article = {
    source: {
        id: "cnn",
        name: "CNN"
    },
    author: "Analysis by Chris Cillizza, CNN Editor-at-large",
    title: "Analysis: Bernie Sanders isn't sorry",
    description: "Earlier this week, Bernie Sanders took a good amount of flack -- and rightly so -- for suggesting that because he had been openly critical of Amazon not paying taxes, he was getting less-than-favorable coverage from The Washington Post.",
    url: "https://www.cnn.com/2019/08/14/politics/bernie-sanders-media-2020/index.html",
    urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/190813000621-bernie-sanders-iowa-0811-super-tease.jpg",
    publishedAt: "2019-08-14T23:32:36Z",
    content: "THE POINT -- NOW ON YOUTUBE! \r\nIn each episode of his weekly YouTube show, Chris Cillizza will delve a little deeper into the surreal world of politics. Click to subscribe!"
}

  ReactDOM.render(
    <BrowserRouter>
      <NewsItem article={article} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

