'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import { firebaseApp } from '../../../utils/db';
import { useState } from 'react';
import { AdminAppRoute } from '../../../utils/routing';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { registerWithCredentials } = useAuth(firebaseApp);

  const handleForm = async () => {
    await registerWithCredentials(email, password);

    return router.push(AdminAppRoute.HOME);
  };
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <h1 className="mt-60 mb-30">Sign up</h1>
        <form onSubmit={handleForm} className="form">
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
