import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDI0OCE7T9UzcjLEA25mORAkZDqlZT4Kc0",
  authDomain: "onur-blog-project.firebaseapp.com",
  projectId: "onur-blog-project",
  storageBucket: "onur-blog-project.appspot.com",
  messagingSenderId: "165978863951",
  appId: "1:165978863951:web:0ae74a72e0afe1f82aad3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const createUser = async (
  email,
  password,
  displayName,
  navigate,
  setCurrentUser
) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    /*  const user = userCredential.user; */
    await updateProfile(auth.currentUser, { displayName: displayName });
    navigate("/");
    setCurrentUser(displayName);
    console.log(userCredential);
  } catch (error) {
    console.log(error.message);
  }
};
export const signIn = async (
  email,
  password,
  navigate,
  setCurrentUser,
  currentUser
) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    setCurrentUser(currentUser);
    console.log(userCredential);
  } catch (err) {
    console.log(err.message);
  }
};
export const logOut = () => {
  signOut(auth);
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
      console.log(currentUser);
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};
export const signUpProvider = (
  navigate,
  setCurrentUser,
  toastSuccessNotify
) => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(() => {
      toastSuccessNotify("Google Login Successful");
      navigate("/");
      userObserver(setCurrentUser);
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
    });
};
