import { createSlice } from '@reduxjs/toolkit';

type LoadingSliceState = {
  isLoading: boolean;
};

const initialState: LoadingSliceState = { isLoading: false };

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    endLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { endLoading, startLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
