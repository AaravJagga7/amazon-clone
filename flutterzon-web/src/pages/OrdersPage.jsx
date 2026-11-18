import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  CheckCircle2,
  Truck,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const OrdersPage = () => {
  const { orders, navigateToProduct, navigateToHome, addToCart } = useApp();

  const stages = [
    { label: 'Ordered', icon: Clock },
    { label: 'Shipped', icon: Package },
    { label: 'Out for Delivery', icon: Truck },
    { label: 'Delivered', icon: CheckCircle2 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 text-xs">
      <div className="border-b border-gray-300 pb-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-gray-500 text-xs mt-1">
          Track packages, return items or buy again.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-lg shadow-sm border border-gray-100 space-y-3">
          <Package size={48} className="mx-auto text-gray-300" />
          <h3 className="font-bold text-base text-gray-800">
            No orders placed yet.
          </h3>
          <p className="text-gray-500 text-xs">
            Looks like you haven't placed an order yet. Start shopping to view your orders here!
          </p>
          <button
            onClick={navigateToHome}
            className="bg-[#ffd814] text-black font-semibold px-6 py-2 rounded-full border border-[#fcd200] text-xs"
          >
            Explore Deals
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const currentStage = order.currentStage ?? 0;

            return (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="uppercase text-[10px] text-gray-500 font-bold">
                        Order Placed
                      </p>
                      <p className="font-medium text-gray-900">{order.date}</p>
                    </div>

                    <div>
                      <p className="uppercase text-[10px] text-gray-500 font-bold">
                        Total
                      </p>
                      <p className="font-bold text-gray-900">
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="uppercase text-[10px] text-gray-500 font-bold">
                        Ship To
                      </p>
                      <p className="font-medium text-[#007185] hover:underline cursor-pointer">
                        {order.deliveryAddress?.fullName || 'Aarav Sharma'}
                      </p>
                    </div>

                    <div>
                      <p className="uppercase text-[10px] text-gray-500 font-bold">
                        Payment
                      </p>
                      <p className="font-medium text-gray-700">
                        {order.paymentMethod || 'Prepaid'}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="uppercase text-[10px] text-gray-500 font-bold">
                      Order #{order.id}
                    </p>
                    <span
                      className={`inline-block mt-1 font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Bar */}
                <div className="p-5 border-b border-gray-100 bg-amber-50/20">
                  <h4 className="font-bold text-xs text-gray-800 mb-4 flex items-center gap-1.5">
                    <Truck size={14} className="text-amber-600" />
                    <span>Delivery Status Tracker</span>
                  </h4>

                  <div className="relative flex items-center justify-between max-w-xl mx-auto px-4">
                    {/* Connecting line */}
                    <div className="absolute left-10 right-10 top-4 h-1 bg-gray-200 -z-0">
                      <div
                        className="h-full bg-emerald-500 transition-all duration-500"
                        style={{
                          width: `${(currentStage / (stages.length - 1)) * 100}%`,
                        }}
                      />
                    </div>

                    {stages.map((stage, idx) => {
                      const Icon = stage.icon;
                      const isCompleted = idx <= currentStage;
                      const isCurrent = idx === currentStage;

                      return (
                        <div
                          key={idx}
                          className="flex flex-col items-center relative z-10"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition shadow-sm ${
                              isCompleted
                                ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                                : 'bg-white border-2 border-gray-300 text-gray-400'
                            }`}
                          >
                            <Icon size={14} />
                          </div>
                          <span
                            className={`text-[11px] mt-2 font-medium text-center ${
                              isCurrent
                                ? 'text-emerald-700 font-bold'
                                : isCompleted
                                ? 'text-gray-900'
                                : 'text-gray-400'
                            }`}
                          >
                            {stage.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-5 space-y-4 divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain rounded border p-1 bg-white flex-shrink-0"
                        />
                        <div>
                          <h4
                            onClick={() => navigateToProduct(item.id)}
                            className="font-bold text-xs text-gray-900 hover:text-[#c45500] cursor-pointer line-clamp-2"
                          >
                            {item.name}
                          </h4>
                          <p className="text-gray-500 text-[11px] mt-0.5">
                            Quantity: <strong>{item.quantity}</strong> | Price:{' '}
                            <strong>₹{item.price.toLocaleString()}</strong>
                          </p>
                          <span className="text-[10px] text-emerald-700 font-semibold">
                            Return window closed 30 days after delivery
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => {
                            addToCart(
                              {
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                originalPrice: item.price * 1.2,
                                discountPercent: 15,
                                rating: 4.5,
                                ratingCount: 100,
                                inStock: true,
                                images: [item.image],
                                category: item.category || 'all',
                              },
                              1
                            );
                          }}
                          className="flex-1 sm:flex-none bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-4 py-1.5 rounded-full border border-[#fcd200] text-xs transition"
                        >
                          Buy it again
                        </button>
                        <button
                          onClick={() => navigateToProduct(item.id)}
                          className="flex-1 sm:flex-none bg-white hover:bg-gray-100 text-gray-800 font-semibold px-3 py-1.5 rounded-full border border-gray-300 text-xs transition"
                        >
                          View item
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

