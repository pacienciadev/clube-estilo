import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<object>;
  restricted?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  restricted = false,
  ...rest
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
