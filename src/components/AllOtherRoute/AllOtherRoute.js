import React from 'react';
import { Route } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

export default function AllOtherRoute({ component, ...props }) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext => 
          <Component {...componentProps} />}
        </UserContext.Consumer>
        
      )}
    />
  );
}
