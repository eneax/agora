import React, { useState, useEffect, useContext, createContext } from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';

import { createUser } from './db';
import firebase from './firebase';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => useContext(authContext);

const formatUser = user => ({
  uid: user.uid,
  email: user.email,
  name: user.displayName,
  provider: user.providerData[0].providerId,
  photoUrl: user.photoURL,
  token: user.ya,
});

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const handleUser = rawUser => {
    if (rawUser) {
      const user = formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      cookie.set('agora-auth', true, {
        expires: 1, // cookie expires in 1 day
      });

      return user;
    }

    setUser(false);
    cookie.remove('agora-auth');

    return false;
  };

  const signinWithGitHub = () => {
    Router.push('/dashboard');

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then(response => handleUser(response.user));
  };

  const signinWithGoogle = () => {
    Router.push('/dashboard');

    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(response => handleUser(response.user));
  };

  const signout = () => {
    Router.push('/');

    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  // it runs whenever the state of the app changes
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGitHub,
    signinWithGoogle,
    signout,
  };
};
