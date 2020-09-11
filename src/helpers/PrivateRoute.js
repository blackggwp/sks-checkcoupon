import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  const isLogin = localStorage.getItem('isLogin')

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? (
          <Component {...props} />

        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
