import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<object>;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { loggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};