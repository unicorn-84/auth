import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

initializeApp({
  apiKey: "AIzaSyCNeVqrS08SwmxxAyuKPCjclKNWeRyoQEI",
  authDomain: "auth-dev-2ed53.firebaseapp.com",
  projectId: "auth-dev-2ed53",
  storageBucket: "auth-dev-2ed53.appspot.com",
  messagingSenderId: "714018102272",
  appId: "1:714018102272:web:138459507b7ec51460cce5",
});

export const auth = getAuth();

export const signIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);
