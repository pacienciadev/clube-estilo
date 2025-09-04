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
    const [firstName, lastName] = userName.split(" ");

    return {
      initials: `${firstName.charAt(0)}${lastName.charAt(0)}`,
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
