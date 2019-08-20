import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import AllOtherRoute from '../AllOtherRoute/AllOtherRoute'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute'
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute'
import LoginRoute from '../../routes/LoginRoute/LoginRoute'
import UserRoute from '../../routes/UserRoute/UserRoute'
import Search from '../../routes/Search/Search'
import Dashboard from '../Dashboard/Dashboard'
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute'
import './App.scss'
import RepresentativeRoute from '../../routes/RepresentativeRoute/RepresentativeRoute';
import VoterRegistrationRoute from '../../routes/VoterRegistrationRoute/VoterRegistrationRoute';

export default class App extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    const { hasError } = this.state
    return (
      <div className='App'>
        <Header />
        <main className='main-app'>
          {hasError && (
            <p>There was an error!</p>
          )}
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={RegistrationRoute}
            />
            <Route
              exact
              path={'/dashboard'}
              component={Dashboard}
              />
            <AllOtherRoute
              path={'/search'}
              component={Search}
              />

            <Route
              path={'/dashboard'}
              component={Dashboard}
            />
            <Route
              path={'/voter-registration'}
              component={VoterRegistrationRoute}
            />
            <Route
              path={'/representatives/:repId'}
              component={RepresentativeRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <PrivateRoute
              path={'/user/:userId'}
              component={UserRoute}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}
