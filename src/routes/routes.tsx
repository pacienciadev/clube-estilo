import React from "react";
import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";

import { PrivateRoute, PublicRoute } from "./components";

import { LoginPage } from "../pages/auth/Login";
import { LoginWithPasswordPage } from "../pages/auth/LoginWithPassword";
import { RegisterPage } from "../pages/auth/Register";
import { TabsPage } from "../pages/tabs";
import { UserAddressPage } from "../pages/user/UserAddressPage";

import { useAuth } from "../contexts/useAuth";
import { UserCreateAddressPage } from "../pages/user/UserCreateAddressPage";
import { WelcomePage } from "../pages/welcome/Welcome";
import { WelcomeCreateAddressPage } from "../pages/welcome/WelcomeCreateAddressPage";
import { UserUpdateAddressPage } from "../pages/user/UserUpdateAddressPage";
import { PartnersPage } from "../pages/partners/Partners";
import { UserListPage } from "../pages/user/UserListPage";

export const AppRoutes: React.FC = () => {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <IonRouterOutlet>
      <PublicRoute
        path="/login"
        component={LoginPage}
      />
      <PublicRoute
        path="/login-with-password"
        component={LoginWithPasswordPage}
      />
      <PublicRoute
        path="/register"
        component={RegisterPage}
      />

      <PrivateRoute path="/tabs" component={TabsPage} />
      <PrivateRoute path="/welcome" component={WelcomePage} />
      <PrivateRoute
        path="/welcome/address"
        component={WelcomeCreateAddressPage}
      />
      <PrivateRoute path="/user/address" component={UserAddressPage} />
      <PrivateRoute
        path="/user/address/new"
        component={UserCreateAddressPage}
      />
      <PrivateRoute
        path="/user/address/update/:id"
        component={UserUpdateAddressPage}
      />
      <PrivateRoute
        path="/partners"
        component={PartnersPage}
      />
      <PrivateRoute
        path="/partners/admin/users"
        component={UserListPage}
      />

      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </IonRouterOutlet>
  );
};
