import React, { Component } from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'

const UserContext = React.createContext({
  user: {},
  error: null,
  fetching: null,
  state: null,
  district: null,
  representatives: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setRepresentatives: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = {
      user: {},
      state: null,
      district: null,
      representatives: null,
      error: null,
      fetching: false,
    }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
        address: jwtPayload.address,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setFetching = (arg) => {
    this.setState({fetching: arg})
  }

  setUser = user => {
    this.setState({ user })
  }

  setUserState = state => {
    this.setState({ state })
  }

  setUserDistrict = district => {
    this.setState({ district })
  }

  setRepresentatives = representatives => {
    this.setState({ representatives })
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
      address: jwtPayload.address,
    })
    IdleService.regiserIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      fetching: this.state.fetching,
      state: this.state.state,
      district: this.state.district,
      representatives: this.state.representatives,
      setError: this.setError,
      setFetching: this.setFetching,
      clearError: this.clearError,
      setUser: this.setUser,
      setUserState: this.setUserState,
      setUserDistrict: this.setUserDistrict,
      setRepresentatives: this.setRepresentatives,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
