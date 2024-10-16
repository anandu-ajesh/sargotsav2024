'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react'; // Assuming you are using next-auth
import { LoadingOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';


export default function AuthorLayout() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }
   

    // await fetch('/api/register', {
    //   cache: 'no-store',
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'applications/json',
    //   },
    //   body: JSON.stringify({username: email, password})
    // })

    // SignIn logic using next-auth or custom logic
    const res = await signIn('credentials', {
      username: email,
      password,
      redirect: false
    });

    if (res?.error) {
      setLoading(false);
      toast.error("Invalid credentials")
      console.log(res.error)
      setError('Incorrect email or password');
    } else {
      setLoading(false);
      toast.success("Login Successfull")
      router.push('/dashboard'); // Redirect to dashboard on successful login
    }
  };

  return (
    <div className="flex flex-col m-4">
      {/* <div className="flex items-center justify-center space-y-2 m-4 pt-10 md:space-y-5">
        <h1 className="text-3xl font-extrabold  tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Login
        </h1>
      </div> */}
      <div className="flex-grow h-[600px] mx-5 flex items-center justify-center">
        <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
          <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mb-4 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 mb-4 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              {loading ? <LoadingOutlined /> : 'Login'}
            </button>
            {error && (
              <p className="text-sm text-center text-red-500">{error}</p>
            )}
          </form>
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 my-4">
            Can't sign-in?{' '}
            <a href="mailto:techosaanandu@gmail.com" className="text-blue-600 hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
