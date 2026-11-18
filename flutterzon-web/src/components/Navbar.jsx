import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/initialData';
import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  User,
  ShieldAlert,
  ArrowRightLeft,
  X,
  PackageCheck
} from 'lucide-react';

export const Navbar = () => {
  const {
    cartCount,
    orders,
    user,
    isAdminMode,
    setIsAdminMode,
    setIsAuthModalOpen,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    deliveryAddress,
    navigateToHome,
  } = useApp();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentView !== 'home') {
      setCurrentView('home');
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const activeCategoryName =
    CATEGORIES.find((c) => c.id === selectedCategory)?.name || 'All';

  return (
    <header className="sticky top-0 z-50 bg-amazon-nav text-white">
      {/* Top Banner for Admin Mode indication */}
      {isAdminMode && (
        <div className="bg-[#b12704] text-white text-xs px-4 py-1 flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <ShieldAlert size={14} />
            <span>Admin Control Active — Managing Products, Category Analytics & Customer Orders</span>
          </div>
          <button
            onClick={() => {
              setIsAdminMode(false);
              setCurrentView('home');
            }}
            className="underline hover:text-yellow-200"
          >
            Exit Admin View
          </button>
        </div>
      )}

      <div className="max-w-[1500px] mx-auto px-3 py-2 flex items-center gap-3">
        {/* Amazon Logo */}
        <div
          onClick={navigateToHome}
          className="flex items-center cursor-pointer p-1.5 border border-transparent hover:border-white rounded transition"
        >
          <img
            src="/assets/images/amazon_in.png"
            alt="Amazon"
            className="h-8 object-contain"
            onError={(e) => {
              // fallback if image not loaded
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="hidden font-bold text-xl tracking-tight items-center">
            <span>flutter</span>
            <span className="text-amazon-orange">zon</span>
            <span className="text-xs text-gray-300 ml-1">.in</span>
          </div>
        </div>

        {/* Deliver To Pin */}
        <div
          onClick={() => setCurrentView('checkout')}
          className="hidden md:flex items-center gap-1 cursor-pointer p-1.5 border border-transparent hover:border-white rounded transition leading-tight text-xs"
          title="Change delivery location"
        >
          <MapPin size={18} className="text-gray-300 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="text-gray-400">Deliver to {user.name.split(' ')[0]}</span>
            <span className="font-bold text-white text-sm whitespace-nowrap">
              {deliveryAddress.city} {deliveryAddress.pincode}
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 flex items-center h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amazon-orange"
        >
          {/* Category dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="h-10 px-3 bg-gray-100 hover:bg-gray-200 text-[#0F1111] text-xs font-medium flex items-center gap-1 border-r border-gray-300 whitespace-nowrap"
            >
              <span>{activeCategoryName}</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>

            {isCategoryMenuOpen && (
              <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded shadow-xl text-black py-1 z-50 max-h-72 overflow-y-auto">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setIsCategoryMenuOpen(false);
                      if (currentView !== 'home') setCurrentView('home');
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#007185] hover:text-white flex items-center justify-between ${
                      selectedCategory === cat.id ? 'font-bold bg-gray-100' : ''
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search text input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Amazon.in (e.g. iPhone, Sony, Coffee, Jacket)"
            className="flex-1 px-3 text-sm text-black outline-none h-full"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-gray-400 hover:text-gray-600 px-2"
            >
              <X size={16} />
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            className="bg-[#febd69] hover:bg-[#f3a847] text-slate-800 w-11 h-full flex items-center justify-center transition"
          >
            <Search size={20} />
          </button>
        </form>

        {/* Language selector */}
        <div className="hidden lg:flex items-center gap-1 cursor-pointer p-2 border border-transparent hover:border-white rounded transition text-xs font-bold">
          <span>🇮🇳</span>
          <span>EN</span>
        </div>

        {/* Account & Lists dropdown */}
        <div
          onMouseEnter={() => setIsUserMenuOpen(true)}
          onMouseLeave={() => setIsUserMenuOpen(false)}
          className="relative cursor-pointer p-1.5 border border-transparent hover:border-white rounded transition leading-tight text-xs flex flex-col justify-center"
        >
          <span className="text-gray-300">Hello, {user.name.split(' ')[0]}</span>
          <div className="flex items-center font-bold text-sm">
            <span>Account & Lists</span>
            <ChevronDown size={14} className="ml-0.5 text-gray-400" />
          </div>

          {isUserMenuOpen && (
            <div className="absolute right-0 top-full mt-0 w-64 bg-white text-black rounded shadow-2xl border border-gray-200 p-4 z-50">
              <div className="border-b pb-3 mb-3">
                <p className="font-semibold text-sm">Signed in as:</p>
                <p className="text-xs text-gray-600 font-medium">{user.email}</p>
                <span
                  className={`inline-block mt-1 text-[10px] uppercase tracking-wide font-bold px-2 py-0.5 rounded ${
                    isAdminMode ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {isAdminMode ? 'Admin Account' : 'Standard Customer'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <button
                  onClick={() => {
                    setCurrentView('orders');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left py-1 hover:text-[#c45500] hover:underline flex items-center justify-between"
                >
                  <span>Your Orders</span>
                  <span className="text-gray-400">({orders.length})</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView('cart');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full text-left py-1 hover:text-[#c45500] hover:underline flex items-center justify-between"
                >
                  <span>Your Cart</span>
                  <span className="text-gray-400">({cartCount})</span>
                </button>

                <div className="border-t my-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAdminMode(!isAdminMode);
                      if (!isAdminMode) {
                        setCurrentView('admin');
                      } else {
                        setCurrentView('home');
                      }
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left py-1 text-blue-700 font-medium hover:underline flex items-center gap-1.5"
                  >
                    <ArrowRightLeft size={13} />
                    <span>{isAdminMode ? 'Switch to Customer View' : 'Switch to Admin Panel'}</span>
                  </button>
                </div>

                <div className="border-t pt-2">
                  <button
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-1.5 rounded text-center border border-[#fcd200]"
                  >
                    Switch Account / Sign In
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div
          onClick={() => setCurrentView('orders')}
          className="cursor-pointer p-1.5 border border-transparent hover:border-white rounded transition leading-tight text-xs flex flex-col justify-center"
        >
          <span className="text-gray-300">Returns</span>
          <span className="font-bold text-sm">& Orders</span>
        </div>

        {/* Cart */}
        <div
          onClick={() => setCurrentView('cart')}
          className="flex items-center cursor-pointer p-1.5 border border-transparent hover:border-white rounded transition relative"
        >
          <div className="relative">
            <ShoppingCart size={32} className="text-white" />
            <span className="absolute top-0 right-1.5 bg-[#f08804] text-black font-bold text-xs w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {cartCount}
            </span>
          </div>
          <span className="font-bold text-sm hidden sm:inline self-end mb-1 ml-1">Cart</span>
        </div>
      </div>
    </header>
  );
};

