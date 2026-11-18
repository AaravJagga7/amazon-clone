import React from 'react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-12 text-white text-xs">
      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475A] hover:bg-[#485769] py-3 text-center text-sm font-semibold transition"
      >
        Back to top
      </button>

      {/* Main Footer Links */}
      <div className="bg-amazon-subnav py-10 px-6 border-b border-gray-700">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">About Flutterzon</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Connect with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter / X</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Sell under Amazon Accelerator</li>
              <li className="hover:underline cursor-pointer">Protect and Build Your Brand</li>
              <li className="hover:underline cursor-pointer">Amazon Global Selling</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">COVID-19 and Amazon</li>
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Help & Customer Care</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Brand bottom bar */}
      <div className="bg-amazon-nav py-8 text-center text-gray-400 space-y-3">
        <div className="flex items-center justify-center gap-2">
          <img
            src="/assets/images/amazon_in.png"
            alt="Amazon"
            className="h-6 object-contain"
          />
          <div className="flex items-center border border-gray-600 rounded px-2 py-1 text-xs text-gray-300">
            <span>🌐 English</span>
          </div>
          <div className="flex items-center border border-gray-600 rounded px-2 py-1 text-xs text-gray-300">
            <span>🇮🇳 India</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 max-w-xl mx-auto px-4">
          This application is a clone created for demo and educational purposes. All product trademarks,
          logos and images are the property of their respective owners.
        </p>

        <p className="text-[11px] text-gray-500">
          © 2026 Flutterzon Clone. Re-architected to a blazing fast React & Web stack.
        </p>
      </div>
    </footer>
  );
};

