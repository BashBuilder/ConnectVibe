import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../pages/auth/config";
import { useAuthContext } from "./authContext";

const UserContext = createContext();

// eslint-disable-next-line
export const UserProvider = ({ children }) => {
  const { authUser } = useAuthContext();
  const [darkMode, setDarkMode] = useState(false);
  const [screen, setScreen] = useState(null);
  const [user, setUser] = useState(null);
  const [newPost, setNewPost] = useState(false);

  // setting the theme dark mode ..................
  if (darkMode) {
    document.body.classList.add("darkMode");
  } else {
    document.body.classList.remove("darkMode");
  }

  useEffect(() => {
    setScreen(window.innerWidth);

    const unsubscribe = async () => {
      try {
        const q = query(
          collection(db, "profile"),
          where("email", "==", authUser?.email),
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.docs.length < 2) {
          setUser({
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          });
        } else {
          alert("Multiple accounts detected");
          throw new Error("Multiple accounts detected");
        }
      } catch (error) {
        console.error(error);
      }
    };
    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider
      value={{
        darkMode,
        setDarkMode,
        screen,
        user,
        newPost,
        setNewPost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line
export const useUserContext = () => useContext(UserContext);
