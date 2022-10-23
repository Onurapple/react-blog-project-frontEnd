import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { userObserver, auth, createUser, signIn } from "../utils/firebaseUtils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toastSuccessNotify = (msg) => {
    toast.success(msg, {
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toastErrorNotify = () => {
    toast.error(`Error Occurred`, {
      position: "top-right",
      autoClose: 5000,
      draggable: true,
    });
  };

  function logOut() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
    };

    fetch("http://127.0.0.1:8000/users/auth/logout/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCurrentUser(false);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  // useEffect(() => {});
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setCurrentUser(user);
  //       setIsLoading(false);
  //     } else {
  //       setCurrentUser(false);
  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  //email, first_name, last_name, password, password2, navigate, setCurrentUser

  function signup(
    email,
    password,
    confirmPassword,
    firstName,
    lastName,
    displayName
  ) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    console.log(
      displayName,
      email,
      firstName,
      lastName,
      password,
      confirmPassword
    );
    const raw = JSON.stringify({
      username: displayName,
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password2: confirmPassword,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/users/register/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCurrentUser(email);
      })
      .catch((error) => console.log("error", error));
  }

  // function signup(email, password, displayName, navigate, setCurrentUser) {
  //   console.log(displayName);
  //   return createUser(email, password, displayName, navigate, setCurrentUser);
  // }
  function login(email, password, setCurrentUser, currentUser, displayName) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000/users/auth/login/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setCurrentUser(email);
      })
      .catch((error) => console.log("error", error));
  }
  // function loginWithGoogle(navigate) {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       console.log(result);
  //       navigate("/");
  //       userObserver(setCurrentUser);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       console.log(error);
  //     });
  // }

  const values = {
    signup,
    login,
    logOut,
    // loginWithGoogle,
    currentUser,
    setCurrentUser,
    // userObserver,
    setCurrentUser,
    toastSuccessNotify,
    toastErrorNotify,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
