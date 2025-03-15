import { Route, Redirect, RouteProps } from "react-router-dom";

import useAuth from "../hooks/useAuth";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<object>;
  restricted: boolean;
}

export const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: PublicRouteProps) => {
  const { loggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && restricted ? (
          <Redirect to="/home/tab1" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
