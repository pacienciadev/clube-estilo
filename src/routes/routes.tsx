import React from "react";
import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";

import { LoginPage } from "../pages/auth/login";
import { TabsPage } from "../pages/tabs";

import { PrivateRoute, PublicRoute } from "./components";
import { LoginWithPasswordPage } from "../pages/auth/loginWithPassword";
import { RegisterPage } from "../pages/auth/register";

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
