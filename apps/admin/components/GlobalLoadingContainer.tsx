'use client';

import { PropsWithChildren } from 'react';
import { useLoading } from '../hooks/useLoading';

const GlobalLoadingContainer = ({ children }: PropsWithChildren) => {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className=" fixed top-0 left-0 z-50 h-full w-full bg-black bg-opacity-30 flex justify-end items-end">
          <div className="flex items-end justify-end">
            <div className="m-5 my-4 p-4 bg-white rounded">
              <p className="text-center">Chargement ...</p>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
};

export default GlobalLoadingContainer;
