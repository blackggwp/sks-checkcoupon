import React, { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import MyErrorBoundary from './components/MyErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

const App = () => {
  return (
    <Router basename="/ecoupon/backend">
      <MyErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
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
