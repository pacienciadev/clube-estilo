import { Route, Redirect, RouteProps } from "react-router-dom";

interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<object>;
  restricted: boolean;
}

export const PublicRoute = ({
  component: Component,
  restricted,
  ...rest
}: PublicRouteProps) => {
  const loggedIn = false;
  const isLoading = false;

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
