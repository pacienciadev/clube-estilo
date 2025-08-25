import React from "react";

import { Redirect, Route } from "react-router-dom";

import { LoginPage } from "../pages/auth/login";
import { HomePage } from "../pages/home";

import { LoginWithPasswordPage } from "../pages/auth/login-with-password";
import { RegisterPage } from "../pages/auth/register";
import { IonRouterOutlet } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <IonRouterOutlet>
      <Route
        exact
        path="/"
        render={() =>
          isAuthenticated ? (
            <Redirect to="/home/tab1" />
          ) : (
            <Redirect to="/login" />
          )
        }
      />

      <Route
        path="/login"
        render={() => (!isAuthenticated ? <LoginPage /> : <Redirect to="/" />)}
      />

      <Route
        path="/login-with-password"
        render={() =>
          !isAuthenticated ? <LoginWithPasswordPage /> : <Redirect to="/" />
        }
      />

      <Route
        path="/register"
        render={() =>
          !isAuthenticated ? <RegisterPage /> : <Redirect to="/" />
        }
      />

      <Route
        path="/home"
        render={(props) =>
          isAuthenticated ? <HomePage {...props} /> : <Redirect to="/" />
        }
      />
    </IonRouterOutlet>
  );
};
