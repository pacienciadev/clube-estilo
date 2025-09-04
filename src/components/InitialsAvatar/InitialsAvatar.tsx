import { IonAvatar } from "@ionic/react";

export const InitialsAvatar = ({
  userName,
  avatarImg,
}: {
  userName: string;
  avatarImg?: string;
}) => {
  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";

    let color = "#";
    
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const avatarHandler = (userName: string) => {

    const nameParts = userName.trim().split(/\s+/);
    const firstInitial = nameParts[0]?.charAt(0) || "";
    const lastInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : "";

    return {
      initials: `${firstInitial}${lastInitial}`,
      backgroundColor: getRandomColor(),
    };
  };

  const { initials, backgroundColor } = avatarHandler(userName);

  return (
    <>
      {!avatarImg ? (
        <div
          className="avatar"
          style={{
            backgroundColor,
          }}
        >
          {initials}
        </div>
      ) : (
        <IonAvatar className="avatar">
          <img alt={`${userName} avatar`} src={avatarImg} />
        </IonAvatar>
      )}
    </>
  );
};
