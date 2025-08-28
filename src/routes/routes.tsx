import React from "react";
import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";

import { LoginPage } from "../pages/Auth/login";
import { TabsPage } from "../pages/Tabs";

import { PrivateRoute, PublicRoute } from "./components";
import { LoginWithPasswordPage } from "../pages/Auth/loginWithPassword";
import { RegisterPage } from "../pages/Auth/register";

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
