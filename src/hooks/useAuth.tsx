import { SetStateAction, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { auth } from "../services";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged((user: SetStateAction<User | null>) => {
      if (user) {
        setLoggedIn(true);
        setUser(user);
      } else {
        setLoggedIn(false);
      }

      setIsLoading(false);
    });
  }, []);

  return {
    user,
    loggedIn,
    isLoading,
  };
};

export default useAuth;
