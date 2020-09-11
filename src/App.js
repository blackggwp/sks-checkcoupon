import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Home from './pages/Home'
import PrivateRoute from './helpers/PrivateRoute'

const App = () => {

  return (
    <Router>
      <Switch>

        <PrivateRoute exact path="/" component={Home} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
