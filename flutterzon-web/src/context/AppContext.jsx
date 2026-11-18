import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_ANALYTICS } from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Products state (persisted)
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('flutterzon_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('flutterzon_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Saved for later
  const [savedForLater, setSavedForLater] = useState(() => {
    const saved = localStorage.getItem('flutterzon_saved_for_later');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('flutterzon_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('flutterzon_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // User & Admin Auth
  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'user@email.com',
    role: 'user', // 'user' or 'admin'
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Navigation & Filtering
  const [currentView, setCurrentView] = useState('home'); // home, product-details, cart, checkout, orders, admin
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Address
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: 'Aarav Sharma',
    addressLine: 'Flat 402, Royal Palms, Sector 62',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    phone: '+91 98765 43210',
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('flutterzon_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('flutterzon_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('flutterzon_saved_for_later', JSON.stringify(savedForLater));
  }, [savedForLater]);

  useEffect(() => {
    localStorage.setItem('flutterzon_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('flutterzon_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart actions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to Cart!`);
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    showToast('Item removed from Cart');
  };

  // Save for Later actions (from Flutterzon app)
  const moveToSaveForLater = (productId) => {
    const item = cart.find((i) => i.product.id === productId);
    if (!item) return;
    setCart((prevCart) => prevCart.filter((i) => i.product.id !== productId));
    setSavedForLater((prev) => [...prev.filter((i) => i.product.id !== productId), item]);
    showToast('Moved to Saved for Later');
  };

  const moveToCartFromSaved = (productId) => {
    const item = savedForLater.find((i) => i.product.id === productId);
    if (!item) return;
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
    addToCart(item.product, item.quantity || 1);
  };

  const removeFromSavedForLater = (productId) => {
    setSavedForLater((prev) => prev.filter((i) => i.product.id !== productId));
    showToast('Removed from Saved for Later');
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wish List');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added to Wish List ❤️');
        return [...prev, productId];
      }
    });
  };

  // Order Placement
  const placeOrder = (paymentMethod) => {
    if (cart.length === 0) return null;
    const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const newOrder = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(10 + Math.random() * 90)}`,
      date: new Date().toISOString().split('T')[0],
      total: totalAmount,
      status: 'Pending',
      currentStage: 0, // 0: Pending, 1: Shipped, 2: Out for delivery, 3: Delivered
      paymentMethod,
      deliveryAddress,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        category: item.product.category,
      })),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    return newOrder;
  };

  // Admin Actions
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      ratingCount: 1,
      inStock: true,
      stockCount: Number(newProduct.stockCount) || 10,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice) || Number(newProduct.price) * 1.2,
      discountPercent: Math.round(
        (((Number(newProduct.originalPrice) || Number(newProduct.price) * 1.2) - Number(newProduct.price)) /
          (Number(newProduct.originalPrice) || Number(newProduct.price) * 1.2)) *
          100
      ),
    };
    setProducts((prev) => [product, ...prev]);
    showToast('Product added successfully!');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted from inventory');
  };

  const updateOrderStatus = (orderId, newStage) => {
    const stages = ['Pending', 'Shipped', 'Out for Delivery', 'Delivered'];
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return {
            ...order,
            currentStage: newStage,
            status: stages[newStage] || order.status,
          };
        }
        return order;
      })
    );
    showToast(`Order status updated to "${stages[newStage]}"`);
  };

  // Quick navigation helpers
  const navigateToProduct = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        cartCount,
        savedForLater,
        wishlist,
        orders,
        user,
        setUser,
        isAdminMode,
        setIsAdminMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        deliveryAddress,
        setDeliveryAddress,
        toast,
        showToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        moveToSaveForLater,
        moveToCartFromSaved,
        removeFromSavedForLater,
        toggleWishlist,
        placeOrder,
        addProduct,
        deleteProduct,
        updateOrderStatus,
        navigateToProduct,
        navigateToHome,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

