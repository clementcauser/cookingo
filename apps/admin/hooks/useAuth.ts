'use client';

import { AuthThunks, setCurrentUser } from '@cookingo/auth';
import { FirebaseApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { useLoading } from './useLoading';
// import { endLoading, startLoading } from '@cookingo/misc';

export const useAuth = (firebaseApp: FirebaseApp) => {
  const {
    loginWithCredentials: loginWithCredentialsThunk,
    registerWithCredentials: registerWithCredentialsThunk,
    logout: logoutThunk,
  } = AuthThunks;
  const dispatch = useDispatch<AppDispatch>();
  const auth = getAuth(firebaseApp);
  const { endLoading, startLoading } = useLoading();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      startLoading();

      dispatch(setCurrentUser({ currentUser: user }));

      endLoading();
    });

    return () => unsubscribe();
  }, [auth, dispatch, startLoading, endLoading]);

  const logout = async () => {
    startLoading();
    try {
      dispatch(logoutThunk({ authInstance: auth }));
    } finally {
      endLoading();
    }
  };

  const loginWithCredentials = async (email: string, password: string) => {
    startLoading();
    try {
      return dispatch(
        loginWithCredentialsThunk({
          authInstance: auth,
          email,
          password,
        })
      );
    } finally {
      endLoading();
    }
  };

  const registerWithCredentials = async (email: string, password: string) => {
    startLoading();
    try {
      dispatch(
        registerWithCredentialsThunk({ authInstance: auth, email, password })
      );
    } finally {
      endLoading();
    }
  };

  return {
    currentUser: useSelector(
      (state: RootState) => state.authReducer.currentUser
    ),
    error: useSelector((state: RootState) => state.authReducer.error),
    registerWithCredentials,
    loginWithCredentials,
    logout,
  };
};
