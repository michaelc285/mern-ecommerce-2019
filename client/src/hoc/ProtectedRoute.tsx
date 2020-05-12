import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { loadUser } from "../context/actions/AuthAction";

export interface IProtectedRoute extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

export default class ProtectedRoute extends Route<IProtectedRoute> {
  public render() {
    let redirectPath: string = "";
    if (!this.props.isAuthenticated) {
      redirectPath = this.props.authenticationPath;
    }

    if (redirectPath) {
      const renderComponent = () => (
        <Redirect to={{ pathname: redirectPath }} />
      );
      return (
        <Route {...this.props} component={renderComponent} render={undefined} />
      );
    } else {
      return <Route {...this.props} />;
    }
  }
}
