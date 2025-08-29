import React from "react";
import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";

import { PrivateRoute, PublicRoute } from "./components";

import { LoginPage } from "../pages/auth/Login";
import { LoginWithPasswordPage } from "../pages/auth/LoginWithPassword";
import { RegisterPage } from "../pages/auth/Register";
import { TabsPage } from "../pages/tabs";

export const AppRoutes: React.FC = () => {
  return (
    <IonRouterOutlet>
      <PublicRoute path="/login" component={LoginPage} exact />
      <PublicRoute
        path="/login-with-password"
        component={LoginWithPasswordPage}
        exact
      />
      <PublicRoute path="/register" component={RegisterPage} exact />

      <PrivateRoute path="/tabs" component={TabsPage} />

      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </IonRouterOutlet>
  );
};
