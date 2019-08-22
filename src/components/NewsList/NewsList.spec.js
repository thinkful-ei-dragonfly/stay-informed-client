import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import NewsList from './NewsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  // make necessary contributions prop to pass in


  ReactDOM.render(
    <BrowserRouter>
      <NewsList />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

