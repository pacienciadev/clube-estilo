// src/components/PrivateRoute.tsx
import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../contexts/useAuth";

import { PrivateRouteProps } from "./types";
import { IonNav } from "@ionic/react";
import { AccessPendingPage } from "../../pages/welcome/AccessPendingPage";

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (isAuthenticated && user?.status === "PENDING") {
    return <AccessPendingPage />;
  }

  return (
    <Route
      {...rest}
      render={(props) => <IonNav root={() => <Component {...props} />} />}
    />
  );
};
