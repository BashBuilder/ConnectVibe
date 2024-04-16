import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../pages/auth/config";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [authCredential, setAuthCredential] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authUser, setAuthUser] = useState({ email: "", token: "" });
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [isSignin, setIsSignin] = useState(false);
  const [apiError, setApiError] = useState([]);

  // user signup here..................
  const signup = async () => {
    if (isSignup) {
      setApiError([]);
      const pictureId = uuidv4();
      try {
        await createUserWithEmailAndPassword(
          auth,
          authCredential.email,
          authCredential.password,
        );
      } catch (error) {
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          setApiError((prev) => [...prev, "Email already in use"]);
        } else if (
          error.message ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setApiError((prev) => [...prev, "Password not strong enough"]);
        } else {
          setApiError((prev) => [
            ...prev,
            "Try again later or make sure you are connected",
          ]);
          console.error(error.message);
        }
        return;
      }
      try {
        const imageRef = ref(
          storage,
          `profile/${pictureId + authCredential.image[0].name}`,
        );
        uploadBytes(imageRef, authCredential.image[0]).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            const profile = collection(db, "profile");
            addDoc(profile, {
              firstName: authCredential.firstName,
              lastName: authCredential.lastName,
              email: authCredential.email.toLowerCase(),
              occupation: authCredential.occupation,
              location: authCredential.location,
              pictureUrl: url,
              friends: [],
              impressions: [],
              profileViews: [],
            });
          });
        });
      } catch (error) {
        console.log(error);
      }
      setIsSignup(false);
      setAuthCredential("");
    }
  };

  useEffect(() => {
    signup();
    // eslint-disable-next-line
  }, [isSignup]);

  // ----------------------------------login user here
  const signin = () => {
    if (isSignin) {
      setApiError([]);
      signInWithEmailAndPassword(
        auth,
        authCredential.email,
        authCredential.password,
      ).catch((error) => {
        if (error.message === "Firebase: Error (auth/wrong-password).") {
          setApiError((prev) => [...prev, "Incorrect password"]);
        } else if (error.message === "Firebase: Error (auth/user-not-found).") {
          setApiError((prev) => [...prev, " User does not exist "]);
        } else if (
          error.message ===
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setApiError((prev) => [
            ...prev,
            "Too many attempts, try again later",
          ]);
        } else {
          console.log(error.message);
          setApiError((prev) => [
            ...prev,
            "Please try again later or check your connection",
          ]);
        }
      });
      setAuthCredential("");
      setIsSignin(false);
    }
  };
  useEffect(() => {
    signin();
    // eslint-disable-next-line
  }, [isSignin]);

  const signout = () => {
    signOut(auth);
  };

  useEffect(() => {
    setApiError([]);
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          token: user.accessToken,
        });
      } else {
        setAuthUser(null);
      }
      setIsLoading(false);
      return () => listen();
    });
  }, []);

  return (
    <Authcontext.Provider
      value={{
        authCredential,
        setAuthCredential,
        isLoading,
        setIsLoading,
        authUser,
        setAuthUser,
        isLogin,
        setIsLogin,
        isSignup,
        setIsSignup,
        isSignin,
        setIsSignin,
        apiError,
        signout,
      }}
    >
      {!isLoading && children}
    </Authcontext.Provider>
  );
};

export const useAuthContext = () => useContext(Authcontext);


