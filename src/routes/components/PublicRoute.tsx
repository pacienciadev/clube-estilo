// src/components/PublicRoute.tsx
import React from "react";
import { IonNav } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";

import { PublicRouteProps } from "./types";

export const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? (
          <IonNav root={() => <Component {...props} />} />
        ) : (
          <Redirect to="/tabs/home" />
        )
      }
    />
  );
};
