import {
  Auth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@firebase/auth';
import { FirebaseError } from 'firebase/app';
import {
  PayloadAction,
  SerializedError,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';

export type AuthSliceState = {
  currentUser: User | null;
  error: SerializedError | null;
};

const initialState: AuthSliceState = {
  currentUser: null,
  error: null,
};

type SetCurrentUserPayload = {
  currentUser: User | null;
};

type CredentialsThunkPayload = {
  authInstance: Auth;
  email: string;
  password: string;
};

type LogoutThunkPayload = {
  authInstance: Auth;
};

const logout = createAsyncThunk<void, LogoutThunkPayload>(
  'auth/logout',
  async ({ authInstance }) => signOut(authInstance)
);

const loginWithCredentials = createAsyncThunk<
  UserCredential,
  CredentialsThunkPayload
>(
  'auth/login-with-credentials',
  async ({ authInstance, email, password }, { rejectWithValue }) => {
    try {
      return signInWithEmailAndPassword(authInstance, email, password);
    } catch (error) {
      const firebaseError = error as FirebaseError;

      return rejectWithValue(firebaseError);
    }
  }
);

const registerWithCredentials = createAsyncThunk<
  UserCredential,
  CredentialsThunkPayload
>(
  'auth/register-with-credentials',
  async ({ authInstance, email, password }, { rejectWithValue }) => {
    try {
      return createUserWithEmailAndPassword(authInstance, email, password);
    } catch (err) {
      const firebaseError = err as FirebaseError;

      return rejectWithValue(firebaseError);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<SetCurrentUserPayload>) => ({
      ...state,
      currentUser: action.payload.currentUser,
    }),
  },
  extraReducers: (builder) => {
    // login error handling
    builder.addCase(loginWithCredentials.fulfilled, (state) => {
      state.error = null;
    });
    // register error handling
    builder.addCase(registerWithCredentials.fulfilled, (state) => {
      state.error = null;
    });
    // login error handling
    builder.addCase(loginWithCredentials.rejected, (state, action) => {
      state.error = action.error;
      state.currentUser = null;
    });
    // register error handling
    builder.addCase(registerWithCredentials.rejected, (state, action) => {
      state.error = action.error;
      state.currentUser = null;
    });
  },
});

export const { setCurrentUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
export const AuthThunks = {
  loginWithCredentials,
  registerWithCredentials,
  logout,
};
