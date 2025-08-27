import { RouteProps } from "react-router";

export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<object>;
}

export interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<object>;
}
