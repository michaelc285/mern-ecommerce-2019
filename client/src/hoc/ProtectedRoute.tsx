import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROLE_ADMIN } from "../context/types";

export interface IProtectedRoute extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  role: string;
  adminRestrict?: boolean;
}

export default class ProtectedRoute extends Route<IProtectedRoute> {
  public render() {
    // If user non-auth add path into reditextPath
    // console.log(`AUTH? ${this.props.isAuthenticated}`);
    // console.log(`Role ${this.props.role}`);
    let redirectPath: string = "";
    if (!this.props.isAuthenticated) {
      redirectPath = this.props.authenticationPath;
    }

    //Role Restrict
    if (this.props.adminRestrict === true) {
      // Role = admin, OK
      if (ROLE_ADMIN === this.props.role) {
        return <Route {...this.props} />;
      } else {
        // If user's account role is not admin redirect to 404 page

        return <Redirect to={{ pathname: "/*" }} />;
      }
    } else {
      // Does not have Role Restrict
      // If auth render component
      if (redirectPath) {
        // Fail
        const renderComponent = () => (
          <Redirect to={{ pathname: redirectPath }} />
        );
        // console.log("fail with only auth required");
        return (
          <Route
            {...this.props}
            component={renderComponent}
            render={undefined}
          />
        );
      } else {
        // Success
        // console.log("Success with no any restrict");
        return <Route {...this.props} />;
      }
    }
  }
}
