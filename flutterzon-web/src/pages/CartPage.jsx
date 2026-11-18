import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Trash2,
  Bookmark,
  CheckCircle2,
  ShieldCheck,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    cartCount,
    updateCartQuantity,
    removeFromCart,
    savedForLater,
    moveToSaveForLater,
    moveToCartFromSaved,
    removeFromSavedForLater,
    setCurrentView,
    navigateToHome,
    navigateToProduct,
  } = useApp();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const isFreeDeliveryEligible = subtotal >= 499;

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-6 text-xs">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cart Items & Saved for later */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Cart Box */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-baseline border-b border-gray-200 pb-3 mb-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Shopping Cart
              </h1>
              <span className="text-gray-500 font-medium">Price</span>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <img
                  src="/assets/images/empty_cart.png"
                  alt="Empty Cart"
                  className="w-40 mx-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <h3 className="text-lg font-bold text-gray-800">
                  Your Flutterzon Cart is empty.
                </h3>
                <p className="text-gray-500 text-xs">
                  Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
                </p>
                <button
                  onClick={navigateToHome}
                  className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-6 py-2 rounded-full border border-[#fcd200] text-xs transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4">
                    {/* Item Image */}
                    <div
                      onClick={() => navigateToProduct(item.product.id)}
                      className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 p-2 rounded cursor-pointer flex-shrink-0 flex items-center justify-center border border-gray-100"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3
                            onClick={() => navigateToProduct(item.product.id)}
                            className="font-bold text-sm text-gray-900 hover:text-[#c45500] cursor-pointer line-clamp-2"
                          >
                            {item.product.name}
                          </h3>
                          <span className="font-bold text-sm sm:text-base text-gray-900 whitespace-nowrap">
                            ₹{(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>

                        <p className="text-emerald-700 font-semibold text-[11px] mt-1 flex items-center gap-1">
                          <CheckCircle2 size={13} />
                          <span>In Stock</span>
                        </p>
                        <p className="text-gray-500 text-[11px]">
                          Eligible for FREE Shipping
                        </p>
                      </div>

                      {/* Controls: Qty, Delete, Save for later */}
                      <div className="flex flex-wrap items-center gap-4 mt-3 pt-2">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-gray-300 rounded-md bg-gray-50 shadow-inner">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, -1)}
                            className="p-1 px-2.5 hover:bg-gray-200 transition text-gray-700"
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="px-3 font-bold text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, 1)}
                            className="p-1 px-2.5 hover:bg-gray-200 transition text-gray-700"
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[#007185] hover:text-[#c45500] hover:underline flex items-center gap-1"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => moveToSaveForLater(item.product.id)}
                          className="text-[#007185] hover:text-[#c45500] hover:underline flex items-center gap-1"
                        >
                          <Bookmark size={13} />
                          <span>Save for later</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <div className="text-right pt-4 border-t border-gray-200 font-medium text-sm">
                Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                <span className="font-bold text-base text-[#b12704]">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Saved for Later Section (Mirroring Flutterzon feature) */}
          {savedForLater.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">
                Saved for later ({savedForLater.length} {savedForLater.length === 1 ? 'item' : 'items'})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedForLater.map((item) => (
                  <div
                    key={item.product.id}
                    className="border border-gray-200 rounded p-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-32 bg-gray-50 rounded p-2 mb-2 flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h4 className="font-bold text-xs text-gray-900 line-clamp-2">
                        {item.product.name}
                      </h4>
                      <div className="font-bold text-sm text-[#b12704] mt-1">
                        ₹{item.product.price.toLocaleString()}
                      </div>
                    </div>

                    <div className="space-y-2 mt-3 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => moveToCartFromSaved(item.product.id)}
                        className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-1.5 rounded-full border border-[#fcd200] text-[11px]"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => removeFromSavedForLater(item.product.id)}
                        className="w-full text-center text-xs text-[#007185] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Checkout Subtotal Box */}
        {cart.length > 0 && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-4 sticky top-20">
              {/* Free delivery indicator */}
              <div className="text-[11px] text-gray-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded">
                {isFreeDeliveryEligible ? (
                  <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    <span>Your order qualifies for <strong>FREE Delivery</strong></span>
                  </div>
                ) : (
                  <div>
                    <span>Add ₹{(499 - subtotal).toLocaleString()} of eligible items to get </span>
                    <strong className="text-emerald-700">FREE Delivery</strong>
                  </div>
                )}
              </div>

              {/* Subtotal */}
              <div className="text-base text-gray-900 font-medium">
                Subtotal ({cartCount} {cartCount === 1 ? 'item' : 'items'}):{' '}
                <span className="font-bold text-lg text-gray-900">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              {/* Gift option */}
              <label className="flex items-center gap-2 cursor-pointer text-gray-700 text-xs select-none">
                <input type="checkbox" className="rounded text-amber-500" />
                <span>This order contains a gift</span>
              </label>

              {/* Proceed to Buy button */}
              <button
                onClick={() => setCurrentView('checkout')}
                className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2.5 rounded-full border border-[#fcd200] shadow-sm transition active:scale-95 text-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Buy ({cartCount} items)</span>
                <ArrowRight size={14} />
              </button>

              <div className="border-t border-gray-200 pt-3 text-[11px] text-gray-500 flex items-center gap-2">
                <ShieldCheck size={18} className="text-gray-400 flex-shrink-0" />
                <span>100% Safe & Secure Payments Guaranteed</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

