// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";

import { PrivateRouteProps } from "./types";
import { IonNav } from "@ionic/react";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <IonNav root={() => <Component {...props} />} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
