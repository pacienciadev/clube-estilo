import React, { lazy } from "react";
import { Redirect, Route } from "react-router";

import { IonRouterOutlet } from "@ionic/react";

import { PrivateRoute, PublicRoute } from "./components";

import { LoginPage } from "../pages/auth/Login";
import { LoginWithPasswordPage } from "../pages/auth/LoginWithPassword";

import { useAuth } from "../contexts/useAuth";

// ----------------------------------------------------------------------
// LAZY IMPORTS (Code Splitting)
// ----------------------------------------------------------------------

// Auth
const RegisterPage = lazy(() => import("../pages/auth/Register").then(module => ({ default: module.RegisterPage })));

// Principais
const TabsPage = lazy(() => import("../pages/tabs").then(module => ({ default: module.TabsPage })));
const PartnersPage = lazy(() => import("../pages/partners/Partners").then(module => ({ default: module.PartnersPage })));

// Welcome
const WelcomePage = lazy(() => import("../pages/welcome/Welcome").then(module => ({ default: module.WelcomePage }))); // <--- CORREÇÃO AQUI
const WelcomeCreateAddressPage = lazy(() => 
  import("../pages/welcome/WelcomeCreateAddressPage").then(module => ({ default: module.WelcomeCreateAddressPage }))
);

// Usuário & Endereços
const UserAddressPage = lazy(() => import("../pages/user/UserAddressPage").then(module => ({ default: module.UserAddressPage })));
const UserCreateAddressPage = lazy(() => 
  import("../pages/user/UserCreateAddressPage").then(module => ({ default: module.UserCreateAddressPage }))
);
const UserUpdateAddressPage = lazy(() => 
  import("../pages/user/UserUpdateAddressPage").then(module => ({ default: module.UserUpdateAddressPage }))
);
const UserListPage = lazy(() => import("../pages/user/UserListPage").then(module => ({ default: module.UserListPage })));

// ----------------------------------------------------------------------
// RESTANTE DO CÓDIGO PERMANECE IGUAL
// ----------------------------------------------------------------------

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
