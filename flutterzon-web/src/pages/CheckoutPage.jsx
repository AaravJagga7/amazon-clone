import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import {
  MapPin,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Package,
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    cart,
    cartCount,
    deliveryAddress,
    setDeliveryAddress,
    placeOrder,
    setCurrentView,
    navigateToHome,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState('Amazon Pay UPI');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({ ...deliveryAddress });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 499 ? 0 : 40;
  const orderTotal = subtotal + shippingFee;

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setDeliveryAddress(addressForm);
    setIsEditingAddress(false);
  };

  const handlePlaceOrder = () => {
    const order = placeOrder(paymentMethod);
    if (order) {
      setConfirmedOrder(order);
      // Trigger festive confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  // Order Confirmed View
  if (confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center text-xs animate-in fade-in">
        <div className="bg-white p-8 rounded-xl shadow-md border border-emerald-100 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={36} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Order Placed, Thank You!
          </h1>
          <p className="text-gray-600 text-sm">
            Confirmation will be sent to your registered email.
          </p>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left space-y-2 mt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Order ID:</span>
              <span className="font-bold text-gray-900">{confirmedOrder.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Guaranteed Delivery:</span>
              <span className="font-bold text-emerald-700">Tomorrow by 8:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Deliver to:</span>
              <span className="font-medium text-gray-800">
                {confirmedOrder.deliveryAddress.fullName}, {confirmedOrder.deliveryAddress.city}
              </span>
            </div>
            <div className="flex justify-between border-t pt-2">
              <span className="text-gray-500">Total Paid:</span>
              <span className="font-bold text-base text-gray-900">
                ₹{confirmedOrder.total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setCurrentView('orders')}
              className="flex-1 bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2.5 rounded-full border border-[#fcd200] text-xs transition"
            >
              View Order Tracking
            </button>
            <button
              onClick={navigateToHome}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2.5 rounded-full border border-gray-300 text-xs transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto p-12 text-center">
        <Package size={48} className="mx-auto text-gray-300 mb-2" />
        <p className="text-sm font-bold text-gray-700">Your cart is empty.</p>
        <button
          onClick={navigateToHome}
          className="mt-3 bg-[#ffd814] px-4 py-2 rounded text-xs font-bold"
        >
          Add Items to Proceed
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 text-xs">
      <div className="flex items-center justify-between border-b border-gray-300 pb-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <div className="flex items-center gap-1 text-gray-500 text-xs">
          <Lock size={15} />
          <span>256-Bit SSL Encryption</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Steps */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Delivery Address */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex items-start gap-2">
                <span className="font-bold text-sm text-gray-900">1</span>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                    <MapPin size={16} className="text-amber-600" />
                    <span>Delivery address</span>
                  </h3>
                  {!isEditingAddress ? (
                    <div className="text-gray-700 mt-2 space-y-0.5 text-xs">
                      <p className="font-bold">{deliveryAddress.fullName}</p>
                      <p>{deliveryAddress.addressLine}</p>
                      <p>
                        {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.pincode}
                      </p>
                      <p>Phone: {deliveryAddress.phone}</p>
                    </div>
                  ) : null}
                </div>
              </div>

              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="text-[#007185] hover:underline font-semibold"
                >
                  Change
                </button>
              )}
            </div>

            {/* Address Edit Form */}
            {isEditingAddress && (
              <form onSubmit={handleSaveAddress} className="mt-4 space-y-3 border-t pt-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Full Name</label>
                    <input
                      type="text"
                      value={addressForm.fullName}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, fullName: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Mobile Phone</label>
                    <input
                      type="text"
                      value={addressForm.phone}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, phone: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Street Address</label>
                  <input
                    type="text"
                    value={addressForm.addressLine}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, addressLine: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">City</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, city: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">State</label>
                    <input
                      type="text"
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, state: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Pincode</label>
                    <input
                      type="text"
                      value={addressForm.pincode}
                      onChange={(e) =>
                        setAddressForm({ ...addressForm, pincode: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded text-xs outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-4 py-1.5 rounded text-xs border border-[#fcd200]"
                  >
                    Save & Use Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Step 2: Payment Method */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-2 mb-3">
              <span className="font-bold text-sm text-gray-900">2</span>
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                <CreditCard size={16} className="text-amber-600" />
                <span>Select a payment method</span>
              </h3>
            </div>

            <div className="space-y-3 pl-5">
              {[
                { id: 'Amazon Pay UPI', label: 'Amazon Pay UPI / Net Banking', tag: 'Fastest' },
                { id: 'Google Pay', label: 'Google Pay / PhonePe / Paytm', tag: 'Popular' },
                { id: 'Credit or Debit Card', label: 'Credit or Debit Card (Visa, Mastercard, RuPay)', tag: '' },
                { id: 'Cash on Delivery', label: 'Cash on Delivery (Pay cash at doorstep)', tag: '' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center justify-between p-3 rounded border cursor-pointer transition ${
                    paymentMethod === method.id
                      ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-400'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <span className="font-medium text-gray-800 text-xs">
                      {method.label}
                    </span>
                  </div>
                  {method.tag && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      {method.tag}
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Step 3: Review Items */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-start gap-2 mb-3">
              <span className="font-bold text-sm text-gray-900">3</span>
              <h3 className="font-bold text-sm text-gray-900">
                Review items and delivery
              </h3>
            </div>

            <div className="space-y-3 pl-5 divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain border p-1 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-500 text-[11px]">
                      Quantity: <strong>{item.quantity}</strong>
                    </p>
                  </div>
                  <span className="font-bold text-xs text-gray-900">
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-4">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 space-y-4 sticky top-20">
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2.5 rounded-full border border-[#fcd200] shadow transition active:scale-95 text-xs flex items-center justify-center gap-2"
            >
              <span>Place your order and pay</span>
              <ArrowRight size={14} />
            </button>

            <p className="text-[10px] text-gray-500 text-center">
              By placing your order, you agree to Flutterzon's conditions of use and sale.
            </p>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-xs">
              <h4 className="font-bold text-gray-900 text-sm mb-2">Order Summary</h4>
              <div className="flex justify-between text-gray-600">
                <span>Items ({cartCount}):</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery:</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base text-[#b12704] border-t pt-2">
                <span>Order Total:</span>
                <span>₹{orderTotal.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-amber-50 p-3 rounded border border-amber-200 text-[11px] text-amber-900">
              <p className="font-bold">✨ Guaranteed Delivery Tomorrow</p>
              <p className="text-gray-600 mt-0.5">
                Order within 3 hours to receive by 8:00 PM tomorrow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

