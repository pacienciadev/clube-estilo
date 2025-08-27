// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";

import { PrivateRouteProps } from "./types";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
