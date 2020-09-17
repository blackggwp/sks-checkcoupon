import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import MyErrorBoundary from './components/MyErrorBoundary';
import PrivateRoute from './helpers/PrivateRoute'

const Home = lazy(() => import('./pages/Home'));

const App = () => {

  return (
    <Router>
      <MyErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </MyErrorBoundary>
    </Router>
  )
}

export default App
