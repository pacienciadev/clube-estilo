import React from "react";

import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import { LoginPage } from "../pages/auth/login";
import { LoginWithPasswordPage } from "../pages/auth/login-with-password";
import { RegisterPage } from "../pages/auth/register";
import { HomePage } from "../pages/home";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const Routes: React.FC = () => {
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <PublicRoute
          restricted={true}
          component={LoginPage}
          path="/login"
          exact
        />

        <PublicRoute
          restricted={true}
          component={LoginWithPasswordPage}
          path="/login-with-password"
          exact
        />

        <PublicRoute
          restricted={true}
          component={RegisterPage}
          path="/register"
          exact
        />

        <PrivateRoute component={HomePage} path="/home" />

        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};
