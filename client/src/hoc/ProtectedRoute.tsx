import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component: Component, store, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(store.getState().auth.isAuthenticated);
        if (store.getState().auth.isAuthenticated) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/unauthorized",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
