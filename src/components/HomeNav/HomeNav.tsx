import { LogoComponent } from "../Logo";
import { InitialsAvatar } from "../InitialsAvatar/InitialsAvatar";
import { useAuth } from "../../contexts/useAuth";

import "./HomeNav.css";

export const HomeNav = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="home-nav ion-padding">
        <LogoComponent size="100px" />

        <InitialsAvatar
          userName={user?.userName || "N a"}
          avatarImg="https://ionicframework.com/docs/img/demos/avatar.svg"
        />
      </div>
    </>
  );
};
