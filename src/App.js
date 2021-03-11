import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import MyErrorBoundary from "./components/MyErrorBoundary";
// import PrivateRoute from './helpers/PrivateRoute'

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

const App = () => {
  return (
    <Router basename="/ecoupon">
      {/* <Router> */}
      <MyErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            {/* <PrivateRoute exact path="/" component={Home} /> */}
            <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login} />
            <Redirect to={`${process.env.PUBLIC_URL}/`} />
          </Switch>
        </Suspense>
      </MyErrorBoundary>
    </Router>
  );
};

export default App;
