'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { firebaseApp } from '../../../utils/db';
import { AdminAppRoute } from '../../../utils/routing';

function Page() {
  const { loginWithCredentials, logout, currentUser, error } =
    useAuth(firebaseApp);
  console.log('🚀 ~ file: page.tsx:11 ~ Page ~ currentUser:', {
    currentUser,
    error,
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleForm = async () => {
    await loginWithCredentials(email, password);

    if (currentUser) {
      router.push(AdminAppRoute.HOME);
    } else if (error) {
      console.error(error);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <button type="button" onClick={() => logout()}>
          Log out
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForm();
          }}
          className="form"
        >
          <label htmlFor="email">
            <p>Email</p>
            <input
              onChange={(e) => {
                e.preventDefault();
                setEmail(e.target.value);
              }}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password</p>
            <input
              onChange={(e) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Page;
