import React, { useState } from 'react';

function AuthPage({ onLogin, onSignup }) {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
    setError('');
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phone: '',
      password: '',
    });
    setError('');
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    resetForm();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    if (isLogin) {
      const result = onLogin({
        email: formData.email,
        password: formData.password,
      });

      if (!result.success) {
        setError(result.message);
      }

      return;
    }

    if (!formData.username || !formData.phone) {
      setError('Please complete all signup fields.');
      return;
    }

    const result = onSignup(formData);

    if (!result.success) {
      setError(result.message);
      return;
    }

    resetForm();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="bg-[linear-gradient(135deg,_rgba(251,191,36,0.22),_rgba(15,23,42,0.28))] p-8 sm:p-10">
          <h1 className="max-w-md text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Sign in to explore hotels and manage bookings.
          </h1>

          <div className="mt-8 rounded-[28px] border border-white/10 bg-black/20 p-6 backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-200">
              Demo login
            </p>
            <div className="mt-4 space-y-2 text-stone-200">
              <p>Email: yash.gupta@example.com</p>
              <p>Password: 123456</p>
            </div>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="flex rounded-full border border-white/10 bg-black/15 p-1">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                isLogin ? 'bg-amber-400 text-stone-950' : 'text-stone-300'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`flex-1 rounded-full px-4 py-3 text-sm font-semibold transition ${
                !isLogin ? 'bg-amber-400 text-stone-950' : 'text-stone-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {!isLogin ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-200">Full name</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                  placeholder="Enter your name"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-200">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                placeholder="Enter your email"
              />
            </label>

            {!isLogin ? (
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-stone-200">Phone</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                  placeholder="Enter your phone number"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-stone-200">Password</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300"
                placeholder="Enter your password"
              />
            </label>

            {error ? <p className="text-sm text-rose-300">{error}</p> : null}

            <button
              type="submit"
              className="w-full rounded-2xl bg-amber-400 px-5 py-3 font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              {isLogin ? 'Login' : 'Create account'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default AuthPage;
