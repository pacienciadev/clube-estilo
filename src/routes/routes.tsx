import React from "react";
import { Switch, Redirect } from "react-router-dom";

import { LoginPage } from "../pages/auth/login";
import { HomePage } from "../pages/home";

import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { LoginWithPasswordPage } from "../pages/auth/login-with-password";
import { RegisterPage } from "../pages/auth/register";

export const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <PublicRoute
        exact
        path="/login"
        component={LoginPage}
        restricted={true}
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

      {/* Rotas protegidas */}
      <PrivateRoute exact path="/home" component={HomePage} />

      {/* Rota raiz redireciona para /home (se logado) ou /login (se não logado) */}
      <PrivateRoute exact path="/" component={HomePage} />

      {/* Se nenhuma rota corresponder, redireciona para a rota raiz */}
      <Redirect to="/" />
    </Switch>
  );
};
