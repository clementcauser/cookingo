'use client';

import { endLoading, startLoading } from '@cookingo/misc';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useLoading = () => {
  const isLoading = useSelector(
    (state: RootState) => state.loadingReducer.isLoading
  );
  const dispatch = useDispatch<AppDispatch>();

  return {
    startLoading: () => dispatch(startLoading()),
    endLoading: () => dispatch(endLoading()),
    isLoading,
  };
};
