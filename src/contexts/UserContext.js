import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  fetching: null,
  state: null,
  district: null,
  representatives: null,
  news: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setRepresentatives: () => {},
  setFinancesOnRep: () =>{},
  processLogin: () => {},
  processLogout: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {},
      state: null,
      district: null,
      representatives: null,
      error: null,
      fetching: false
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
        address: jwtPayload.address
      };

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  setError = error => {
    console.error(error);
    this.setState({ error });
  };

  clearError = () => {
    this.setState({ error: null });
  };

  setFetching = arg => {
    this.setState({ fetching: arg });
  };

  setUser = user => {
    this.setState({ user });
  };

  setUserState = state => {
    this.setState({ state });
  };

  setUserDistrict = district => {
    this.setState({ district });
  };

  setRepresentatives = representatives => {
    this.setState({ representatives });
  };

  setFinancesOnRep = (finObj, idx) =>{
    if (this.state.representatives) {

    const representatives = this.state.representatives.map((rep, i) =>{
      if(i === idx){
        return {...rep, ...finObj}
      }
      return rep;
    });
    this.setState({ representatives });
  }
  }

  setNews = news => {
    this.setState({ news });
  };

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
      address: jwtPayload.address
    });
    IdleService.regiserIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
  };

  processLogout = () => {
    this.setUser({});
    this.setUserState(null)
    this.setState(null);
    this.setUserDistrict(null); 
    this.setRepresentatives(null);
    this.setNews(null);
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
    this.setUserState(null)
    this.setState(null);
    this.setUserDistrict(null); 
    this.setRepresentatives(null);
    this.setNews(null);
  };

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch(err => {
        this.setError(err);
      });
  };

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      fetching: this.state.fetching,
      state: this.state.state,
      district: this.state.district,
      representatives: this.state.representatives,
      news: this.state.news,
      setError: this.setError,
      setFetching: this.setFetching,
      clearError: this.clearError,
      setUser: this.setUser,
      setUserState: this.setUserState,
      setUserDistrict: this.setUserDistrict,
      setRepresentatives: this.setRepresentatives,
      setNews: this.setNews,
      setFinancesOnRep: this.setFinancesOnRep,
      processLogin: this.processLogin,
      processLogout: this.processLogout
     };
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
