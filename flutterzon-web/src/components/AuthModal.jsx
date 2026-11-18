import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Lock, Mail, UserCheck, Shield } from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    setUser,
    setIsAdminMode,
    setCurrentView,
    showToast,
  } = useApp();

  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [email, setEmail] = useState('user@email.com');
  const [password, setPassword] = useState('123456');
  const [name, setName] = useState('Aarav Sharma');

  if (!isAuthModalOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const isAdmin = email.toLowerCase().includes('admin');
    setUser({
      name: isAdmin ? 'Admin Manager' : name || 'Aarav Sharma',
      email: email,
      role: isAdmin ? 'admin' : 'user',
    });
    setIsAdminMode(isAdmin);
    if (isAdmin) {
      setCurrentView('admin');
    }
    setIsAuthModalOpen(false);
    showToast(`Welcome back, ${isAdmin ? 'Admin' : name}!`);
  };

  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      setUser({
        name: 'Store Administrator',
        email: 'admin@email.com',
        role: 'admin',
      });
      setIsAdminMode(true);
      setCurrentView('admin');
      showToast('Logged in as Administrator (Admin Panel opened)');
    } else {
      setUser({
        name: 'Aarav Sharma',
        email: 'user@email.com',
        role: 'user',
      });
      setIsAdminMode(false);
      setCurrentView('home');
      showToast('Logged in as Customer (user@email.com)');
    }
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative border border-gray-200">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <img
            src="/assets/images/amazon_black_logo.png"
            alt="Amazon"
            className="h-9 object-contain mb-2"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <h2 className="text-xl font-bold text-gray-900">
            {mode === 'signin' ? 'Sign in to Flutterzon' : 'Create an Account'}
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Mirroring Flutterzon's full-stack authentication
          </p>
        </div>

        {/* Quick Demo Credentials */}
        <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-5">
          <p className="text-xs font-bold text-amber-900 mb-1.5 flex items-center gap-1">
            <span>⚡ Quick Demo Credentials</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-semibold py-1.5 px-2 rounded flex items-center justify-center gap-1 transition"
            >
              <UserCheck size={13} />
              <span>Customer Mode</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold py-1.5 px-2 rounded flex items-center justify-center gap-1 transition"
            >
              <Shield size={13} />
              <span>Admin Mode</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-bold text-gray-700 mb-1">Your name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First and last name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm"
                required
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Email or mobile phone number
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@email.com or admin@email.com"
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm"
                required
              />
              <Mail size={15} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-gray-700">Password</label>
              {mode === 'signin' && (
                <span className="text-[#0066c0] hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              )}
            </div>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3 py-2 pl-8 border border-gray-300 rounded focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none text-sm"
                required
              />
              <Lock size={15} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2 rounded border border-[#fcd200] shadow-sm text-sm transition"
          >
            {mode === 'signin' ? 'Continue' : 'Create your Flutterzon Account'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
          {mode === 'signin' ? (
            <p>
              New to Flutterzon?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-[#0066c0] font-semibold hover:underline"
              >
                Create your account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-[#0066c0] font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

