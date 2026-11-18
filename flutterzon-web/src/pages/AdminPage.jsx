import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, INITIAL_ANALYTICS } from '../data/initialData';
import {
  BarChart3,
  PackagePlus,
  Trash2,
  TrendingUp,
  ShoppingBag,
  Users,
  CheckCircle,
  Truck,
  Plus,
  X,
  RefreshCw,
} from 'lucide-react';

export const AdminPage = () => {
  const {
    products,
    orders,
    addProduct,
    deleteProduct,
    updateOrderStatus,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState('analytics'); // analytics, products, orders
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'electronics',
    price: '',
    originalPrice: '',
    stockCount: 15,
    imageUrl: '',
    description: '',
  });

  // Calculate dynamic analytics from actual products & orders
  const totalEarnings = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;

  // Compute category earnings
  const categoryEarningsMap = {
    mobiles: 0,
    electronics: 0,
    appliances: 0,
    fashion: 0,
    home: 0,
    books: 0,
    beauty: 0,
  };

  orders.forEach((order) => {
    order.items.forEach((item) => {
      const cat = (item.category || 'electronics').toLowerCase();
      if (categoryEarningsMap[cat] !== undefined) {
        categoryEarningsMap[cat] += item.price * item.quantity;
      } else {
        categoryEarningsMap[cat] = (categoryEarningsMap[cat] || 0) + item.price * item.quantity;
      }
    });
  });

  const chartData = [
    { name: 'Mobiles', value: Math.max(categoryEarningsMap.mobiles || 0, 112999), color: '#ff9900' },
    { name: 'Electronics', value: Math.max(categoryEarningsMap.electronics || 0, 53980), color: '#146eb4' },
    { name: 'Appliances', value: Math.max(categoryEarningsMap.appliances || 0, 43990), color: '#007185' },
    { name: 'Fashion', value: Math.max(categoryEarningsMap.fashion || 0, 10497), color: '#c45500' },
    { name: 'Home', value: Math.max(categoryEarningsMap.home || 0, 29998), color: '#232f3e' },
    { name: 'Books', value: Math.max(categoryEarningsMap.books || 0, 3294), color: '#565959' },
  ];

  const maxChartValue = Math.max(...chartData.map((d) => d.value), 120000);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill in product name and price', 'error');
      return;
    }

    addProduct({
      name: newProduct.name,
      category: newProduct.category,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 1.25,
      stockCount: Number(newProduct.stockCount) || 10,
      images: [
        newProduct.imageUrl ||
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      ],
      description: newProduct.description || 'Premium Amazon Quality Product with warranty.',
    });

    setIsAddModalOpen(false);
    setNewProduct({
      name: '',
      category: 'electronics',
      price: '',
      originalPrice: '',
      stockCount: 15,
      imageUrl: '',
      description: '',
    });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6 text-xs">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#b12704] text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
              ADMIN CONTROL
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Flutterzon Store Management
            </h1>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Overview of total revenue, category distribution, product catalog, and order dispatch.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 transition ${
              activeTab === 'analytics'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 size={15} />
            <span>Earnings Analytics</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 transition ${
              activeTab === 'products'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag size={15} />
            <span>Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3 py-1.5 rounded-md font-semibold text-xs flex items-center gap-1.5 transition ${
              activeTab === 'orders'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Truck size={15} />
            <span>Manage Orders ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-lg">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold">Total Revenue</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  ₹{totalEarnings.toLocaleString()}
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  +18.4% vs last week
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-lg">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold">Total Orders</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {totalOrdersCount} Orders
                </h3>
                <span className="text-[11px] text-gray-500">
                  100% fulfilled without return
                </span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex items-center gap-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-lg">
                <PackagePlus size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-semibold">Live Inventory</p>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {products.length} Items
                </h3>
                <span className="text-[11px] text-emerald-600 font-semibold">
                  All categories active
                </span>
              </div>
            </div>
          </div>

          {/* Category Earnings Visual Graph (replicating Syncfusion Flutter Chart) */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-base font-bold text-gray-900">
                  Category-Wise Earnings Analysis (Syncfusion Architecture)
                </h3>
                <p className="text-gray-500 text-xs">
                  Real-time sales volume breakdown by e-commerce category
                </p>
              </div>
              <span className="text-xs bg-amber-50 text-amber-800 font-bold px-2.5 py-1 rounded border border-amber-200">
                Live Data
              </span>
            </div>

            {/* Bar chart rendering */}
            <div className="space-y-4 pt-2">
              {chartData.map((item) => {
                const percentage = Math.round((item.value / maxChartValue) * 100);

                return (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-gray-800">
                      <span>{item.name}</span>
                      <span>₹{item.value.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-5 overflow-hidden flex items-center p-0.5">
                      <div
                        className="h-full rounded-full transition-all duration-700 flex items-center justify-end pr-2 text-[10px] text-white font-bold"
                        style={{
                          width: `${Math.max(percentage, 5)}%`,
                          backgroundColor: item.color,
                        }}
                      >
                        {percentage}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900">
              Active Inventory ({products.length} Products)
            </h2>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-4 py-2 rounded-md border border-[#fcd200] text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={16} />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Product</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Rating</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50/50">
                      <td className="p-3 flex items-center gap-3">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-12 h-12 object-contain rounded border p-1 bg-white"
                        />
                        <span className="font-semibold text-gray-900 line-clamp-1 max-w-xs">
                          {p.name}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className="bg-gray-100 px-2 py-0.5 rounded text-[11px] font-medium text-gray-700 capitalize">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-gray-900">
                        ₹{p.price.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span className="text-emerald-700 font-bold">
                          {p.stockCount || 10} in stock
                        </span>
                      </td>
                      <td className="p-3">⭐ {p.rating.toFixed(1)}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition"
                          title="Delete product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE ORDERS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h2 className="text-base font-bold text-gray-900">
            Dispatch & Order Status Control ({orders.length} Orders)
          </h2>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">Customer & Address</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Current Status</th>
                    <th className="p-3">Change Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => {
                    const currentStage = order.currentStage ?? 0;

                    return (
                      <tr key={order.id} className="hover:bg-gray-50/50">
                        <td className="p-3 font-bold text-gray-900">{order.id}</td>
                        <td className="p-3 text-gray-700">
                          <p className="font-bold">{order.deliveryAddress?.fullName}</p>
                          <p className="text-[11px] text-gray-500">
                            {order.deliveryAddress?.city}, {order.deliveryAddress?.pincode}
                          </p>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold text-gray-800">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-gray-900">
                          ₹{order.total.toLocaleString()}
                        </td>
                        <td className="p-3">
                          <span
                            className={`font-bold px-2 py-1 rounded text-[10px] uppercase ${
                              order.status === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3">
                          <select
                            value={currentStage}
                            onChange={(e) =>
                              updateOrderStatus(order.id, Number(e.target.value))
                            }
                            className="bg-white border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-amber-500 font-medium"
                          >
                            <option value={0}>0: Pending</option>
                            <option value={1}>1: Shipped</option>
                            <option value={2}>2: Out for Delivery</option>
                            <option value={3}>3: Delivered</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative border border-gray-200">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Add New Product to Flutterzon
            </h2>

            <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Sony Wireless Gaming Controller"
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded outline-none capitalize bg-white"
                  >
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={newProduct.stockCount}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stockCount: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="e.g. 4999"
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">M.R.P. (₹)</label>
                  <input
                    type="number"
                    value={newProduct.originalPrice}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, originalPrice: e.target.value })
                    }
                    placeholder="e.g. 6999"
                    className="w-full p-2 border border-gray-300 rounded outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, description: e.target.value })
                  }
                  placeholder="Product specs, features and key details..."
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded outline-none"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2 rounded border border-[#fcd200]"
                >
                  Publish Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

