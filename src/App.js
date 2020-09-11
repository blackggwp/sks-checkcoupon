import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import PrivateRoute from './helpers/PrivateRoute'
import Cart from './components/Cart'
import Checkout from './pages/Checkout'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'

const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>

        <PrivateRoute exact path="/" component={Home} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/checkout" component={Checkout} />
        <Redirect to="/" />
      </Switch>
    </Router>
  )
}

export default App
