import 'unfetch/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserProvider } from './contexts/UserContext'
import App from './components/App/App'
import './index.scss'
import * as serviceWorker from './serviceWorker'


library.add (
  faSpinner,
  faTrashAlt,
  faEdit
)

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
