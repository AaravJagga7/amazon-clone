import React from 'react';
import { useApp } from '../context/AppContext';
import { Menu, ShieldCheck, Flame, Tv, Gift } from 'lucide-react';

export const Subnav = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    currentView,
    setCurrentView,
    isAdminMode,
    setIsAdminMode,
  } = useApp();

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  return (
    <div className="bg-amazon-subnav text-white text-xs px-3 py-1.5 flex items-center justify-between border-t border-slate-700 overflow-x-auto select-none">
      <div className="flex items-center gap-4 max-w-[1500px] whitespace-nowrap">
        {/* Hamburger All */}
        <button
          onClick={() => handleCategoryClick('all')}
          className="flex items-center gap-1 font-bold p-1 border border-transparent hover:border-white rounded transition"
        >
          <Menu size={17} />
          <span>All</span>
        </button>

        {/* MiniTV */}
        <button
          onClick={() => handleCategoryClick('minitv')}
          className="flex items-center gap-1 p-1 border border-transparent hover:border-white rounded transition font-medium text-amber-300"
        >
          <Tv size={14} />
          <span>Amazon miniTV</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => handleCategoryClick('mobiles')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'mobiles' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Mobiles
        </button>

        <button
          onClick={() => handleCategoryClick('electronics')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'electronics' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Electronics
        </button>

        <button
          onClick={() => handleCategoryClick('appliances')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'appliances' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Appliances
        </button>

        <button
          onClick={() => handleCategoryClick('fashion')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'fashion' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Fashion
        </button>

        <button
          onClick={() => handleCategoryClick('home')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'home' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Home & Kitchen
        </button>

        <button
          onClick={() => handleCategoryClick('books')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'books' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Books
        </button>

        <button
          onClick={() => handleCategoryClick('beauty')}
          className={`p-1 border border-transparent hover:border-white rounded transition ${
            selectedCategory === 'beauty' ? 'text-amber-400 font-bold' : ''
          }`}
        >
          Beauty
        </button>

        <button
          onClick={() => handleCategoryClick('all')}
          className="flex items-center gap-1 p-1 border border-transparent hover:border-white rounded transition text-red-400 font-semibold"
        >
          <Flame size={13} />
          <span>Today's Deals</span>
        </button>
      </div>

      {/* Admin Panel Quick Toggle */}
      <div className="flex items-center ml-4 pl-4 border-l border-slate-600 whitespace-nowrap">
        <button
          onClick={() => {
            const nextMode = !isAdminMode;
            setIsAdminMode(nextMode);
            if (nextMode) {
              setCurrentView('admin');
            } else {
              setCurrentView('home');
            }
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-bold text-xs transition shadow-sm ${
            isAdminMode
              ? 'bg-amber-500 hover:bg-amber-600 text-black'
              : 'bg-slate-700 hover:bg-slate-600 text-amber-300 border border-amber-400/40'
          }`}
        >
          <ShieldCheck size={14} />
          <span>{isAdminMode ? 'Admin Portal Active' : 'Switch to Admin Panel'}</span>
        </button>
      </div>
    </div>
  );
};

