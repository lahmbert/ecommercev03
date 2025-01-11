'use client';

import supabase from '@/app/lib/Supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Perform client-side specific logic (like checking for authentication)
  }, []);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Please fill all in both email and password.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error details:', error);
      setErrorMessage('Login failed: ' + error.message);
    } else {
      router.push('/');
    }
  };

  const handleRegister = () => {
    return router.push('/auth/register');
  };

  return (
    <div className="bg-gradient-to-bl from-blue-500 h-screen mt-0 to-purple-500">
      <div className="pt-[5rem] text-center justify-items-center">
        <div className="bg-slate-50 mx-4 rounded-lg p-8 sm:flex flex-row sm:gap-5 py-10 shadow-lg sm:w-[50rem]">
          <div className="sm:flex hidden w-[30rem] justify-center justify-items-center items-center">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" />
          </div>
          <div className="flex sm:w-[20rem] flex-col">
            <div className="pb-8">
              <span className="text-2xl font-semibold">Logo</span>
              <p className="text-sm py-1">Login to continue!</p>
            </div>
            {errorMessage && (
              <p className="text-red-500 py-2">{errorMessage}</p>
            )}
            <form
              onSubmit={handleLoginUser}
              className="flex flex-col gap-6 text-start text-sm"
            >
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Input your email...."
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="ml-1 mt-2 p-1 border border-slate-400 focus:outline-none rounded-sm"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Input your password..."
                  required
                />
              </div>
              <div className="flex justify-between gap-3 px-3">
                <div className="flex items-center gap-1">
                  <input type="checkbox" name="remember" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <div>
                  <span className="cursor-pointer text-blue-500">
                    Forgot Password
                  </span>
                </div>
              </div>
              <div className="py-2">
                <button
                  type="submit"
                  className="uppercase font-bold duration-300 text-slate-100 hover:-translate-y-1 p-2 w-full bg-gradient-to-tl from-green-500 to-lime-500 shadow-md rounded-sm"
                >
                  Sign
                </button>
              </div>
              <div className="flex text-center justify-center cursor-pointer gap-1">
                <span> Don't have an account? </span>
                <span onClick={handleRegister} className="text-blue-500">
                  Sign Up!
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
