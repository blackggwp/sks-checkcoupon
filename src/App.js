import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import MyErrorBoundary from './components/MyErrorBoundary';
// import PrivateRoute from './helpers/PrivateRoute'

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {

  return (
    // <Router basename="/ecoupon/portal">
    <Router>
      <MyErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </MyErrorBoundary>
    </Router>
  )
}

export default App
