// src/auth.js
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from '@react-native-firebase/auth';

const auth = getAuth();

export const createUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const isUserAuthenticated = () => {
  const user = auth.currentUser;
  return user !== null;
};

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
