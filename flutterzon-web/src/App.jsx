import React from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Subnav } from './components/Subnav';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { HomePage } from './pages/HomePage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const App = () => {
  const { currentView, toast } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#eaeded] selection:bg-amber-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-3 border border-gray-700 animate-in slide-in-from-bottom text-xs max-w-sm">
          {toast.type === 'error' ? (
            <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
          ) : (
            <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar />
      <Subnav />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomePage />}
        {currentView === 'product-details' && <ProductDetailsPage />}
        {currentView === 'cart' && <CartPage />}
        {currentView === 'checkout' && <CheckoutPage />}
        {currentView === 'orders' && <OrdersPage />}
        {currentView === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Sign In & Admin Auth Modal */}
      <AuthModal />
    </div>
  );
};

