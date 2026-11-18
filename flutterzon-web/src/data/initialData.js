export const CATEGORIES = [
  { id: 'all', name: 'All Categories', image: '/assets/images/category_images/deals.jpeg' },
  { id: 'mobiles', name: 'Mobiles', image: '/assets/images/category_images/mobiles.jpeg' },
  { id: 'electronics', name: 'Electronics', image: '/assets/images/category_images/electronics.jpeg' },
  { id: 'appliances', name: 'Appliances', image: '/assets/images/category_images/appliances.jpeg' },
  { id: 'fashion', name: 'Fashion', image: '/assets/images/category_images/fashion.jpeg' },
  { id: 'home', name: 'Home', image: '/assets/images/category_images/home.jpeg' },
  { id: 'beauty', name: 'Beauty', image: '/assets/images/category_images/beauty.jpeg' },
  { id: 'books', name: 'Books', image: '/assets/images/category_images/books.jpeg' },
  { id: 'essentials', name: 'Essentials', image: '/assets/images/category_images/essentials.jpeg' },
  { id: 'grocery', name: 'Grocery', image: '/assets/images/category_images/grocery.jpeg' },
  { id: 'minitv', name: 'MiniTV', image: '/assets/images/category_images/minitv.jpeg' },
];

export const HERO_BANNERS = [
  {
    id: 1,
    title: 'Great Indian Festival',
    subtitle: 'Extra 10% instant discount on leading bank cards',
    badge: 'MEGA SALE LIVE',
    bgColor: 'from-amber-600 via-orange-500 to-amber-700',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop All Deals',
    category: 'all',
  },
  {
    id: 2,
    title: 'Next-Gen Smartphones',
    subtitle: 'Flagship processors, 200MP cameras & up to ₹15,000 off',
    badge: 'LIMITED TIME DEAL',
    bgColor: 'from-blue-900 via-indigo-900 to-slate-900',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Explore Mobiles',
    category: 'mobiles',
  },
  {
    id: 3,
    title: 'Smart Home & Appliances',
    subtitle: 'Energy efficient inverter ACs & 4K Smart TVs up to 55% off',
    badge: 'FESTIVE SPECIAL',
    bgColor: 'from-teal-800 via-emerald-800 to-teal-950',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Upgrade Your Home',
    category: 'appliances',
  },
  {
    id: 4,
    title: 'Trending Fashion Picks',
    subtitle: 'Min. 60% off on top national and global brands',
    badge: 'FRESH ARRIVALS',
    bgColor: 'from-rose-900 via-pink-800 to-purple-950',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Shop Wardrobe',
    category: 'fashion',
  },
];

export const FOUR_IMAGE_OFFERS = [
  {
    id: 'fio-1',
    title: 'Up to 70% off | Styles for Women & Men',
    footerText: 'See all offers',
    category: 'fashion',
    items: [
      {
        title: 'Clothing & Kurtas',
        discount: 'Up to 60% off',
        image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Footwear & Sneakers',
        discount: 'Min. 50% off',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Watches & Smartbands',
        discount: 'Up to 70% off',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Bags & Luggage',
        discount: 'Starting ₹499',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'fio-2',
    title: 'Appliances for your home | Up to 55% off',
    footerText: 'Explore appliances',
    category: 'appliances',
    items: [
      {
        title: 'Air Conditioners',
        discount: 'Up to 50% off',
        image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Refrigerators',
        discount: 'From ₹9,990',
        image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Microwaves',
        discount: 'Up to 60% off',
        image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Washing Machines',
        discount: 'Starts ₹8,490',
        image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'fio-3',
    title: 'Latest Tech & Audio Gear',
    footerText: 'See more electronics',
    category: 'electronics',
    items: [
      {
        title: 'Wireless Headphones',
        discount: 'Up to 75% off',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Smart Watches',
        discount: 'Starting ₹1,299',
        image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Bluetooth Speakers',
        discount: 'Up to 65% off',
        image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Tablets & E-Readers',
        discount: 'Up to 40% off',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  {
    id: 'fio-4',
    title: 'Revamp your Home & Kitchen',
    footerText: 'Explore home decor',
    category: 'home',
    items: [
      {
        title: 'Kitchen Cookware',
        discount: 'Min. 40% off',
        image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Home Lighting',
        discount: 'Up to 70% off',
        image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Bedsheets & Curtains',
        discount: 'Starting ₹299',
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=400&q=80',
      },
      {
        title: 'Storage & Organizers',
        discount: 'Up to 60% off',
        image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
];

export const BOTTOM_OFFERS = [
  { name: 'Amazon Pay', image: '/assets/images/bottom_offers/amazon_pay.png', subtitle: 'Pay bills & earn' },
  { name: 'Recharge', image: '/assets/images/bottom_offers/amazon_recharge.png', subtitle: 'Instant cashback' },
  { name: 'Rewards', image: '/assets/images/bottom_offers/amazon_rewards.png', subtitle: 'Exclusive scratch cards' },
  { name: 'Bill Pay', image: '/assets/images/bottom_offers/amazon_bills.png', subtitle: 'Electricity, DTH & Fastag' },
  { name: 'Top Picks', image: '/assets/images/bottom_offers/topPicks.png', subtitle: 'Curated for you' },
  { name: 'Best Buys', image: '/assets/images/bottom_offers/bestBuys.png', subtitle: 'Customer favorites' },
  { name: 'Budget Buys', image: '/assets/images/bottom_offers/budgetBuys.png', subtitle: 'Under ₹499' },
  { name: 'Super Buys', image: '/assets/images/bottom_offers/superBuys.png', subtitle: 'Daily massive savings' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 15 (128 GB) - Black',
    category: 'mobiles',
    price: 69999,
    originalPrice: 79900,
    discountPercent: 12,
    rating: 4.6,
    ratingCount: 3840,
    isDealOfTheDay: true,
    inStock: true,
    stockCount: 24,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Dynamic Island bubbles up alerts and Live Activities. 48MP Main camera with 2x Telephoto. Durable color-infused glass and aluminum design. USB-C convenience.',
    features: [
      'Super Retina XDR display with 6.1-inch OLED',
      '48MP Main Camera with 2x Telephoto lens',
      'A16 Bionic chip with 5-core GPU',
      'All-day battery life with up to 20 hours video playback',
      'USB-C connector with Universal charging compatibility'
    ],
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Wireless Industry Leading Noise Canceling Headphones',
    category: 'electronics',
    price: 26990,
    originalPrice: 34990,
    discountPercent: 23,
    rating: 4.7,
    ratingCount: 5120,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Two processors and 8 microphones for unprecedented noise cancellation. Crystal clear hands-free calling with 4 beamforming microphones. Up to 30-hour battery life.',
    features: [
      'Auto NC Optimizer keeps noise cancellation at peak efficiency',
      'Integrated Processor V1 + HD Noise Cancelling Processor QN1',
      'Ultra-comfortable lightweight design with soft fit leather',
      '30-hour battery life with quick charging (3 min charge for 3 hours playback)'
    ],
  },
  {
    id: 'prod-3',
    name: 'Samsung 55-inch Crystal 4K Vivid Pro Ultra HD Smart LED TV',
    category: 'appliances',
    price: 43990,
    originalPrice: 68900,
    discountPercent: 36,
    rating: 4.4,
    ratingCount: 1980,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 8,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552975084-6e027cd345c2?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Crystal Processor 4K upscale content for lifelike resolution. PurColor delivers a huge spectrum of colors for optimal picture performance. OTS Lite 3D surround sound.',
    features: [
      '4K Ultra HD (3840 x 2160) Resolution with 50 Hz Refresh Rate',
      'Connectivity: 3 HDMI ports, 1 USB port, Optical audio out',
      'Sound: 20 Watts Output with Q-Symphony and OTS Lite',
      'Smart TV Features: Tizen OS, Voice Assistants, Bixby, Screen Mirroring'
    ],
  },
  {
    id: 'prod-4',
    name: 'OnePlus 12R (16GB RAM, 256GB Storage, Cool Blue)',
    category: 'mobiles',
    price: 42999,
    originalPrice: 45999,
    discountPercent: 7,
    rating: 4.5,
    ratingCount: 2430,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 19,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Snapdragon 8 Gen 2 Mobile Platform. 1.5K 120Hz ProXDR Display with LTPO4.0. Massive 5500 mAh battery with 100W SUPERVOOC charging.',
    features: [
      '5500 mAh Battery with 100W SUPERVOOC Power Adapter included',
      '50MP Sony IMX890 Camera System with OIS',
      '1.5K 120 Hz AMOLED Display with 4500 nits peak brightness',
      'OxygenOS 14 based on Android 14'
    ],
  },
  {
    id: 'prod-5',
    name: "Levi's Men Regular Fit Denim Jacket",
    category: 'fashion',
    price: 3499,
    originalPrice: 6999,
    discountPercent: 50,
    rating: 4.3,
    ratingCount: 890,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 30,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'The original jean jacket since 1967. A blank canvas for self-expression. Classic point collar, front button placket and chest patch pockets.',
    features: [
      '100% Cotton durable rigid denim',
      'Regular fit through shoulders and chest',
      'Side welt pockets and buttoned chest pockets',
      'Machine washable with like colors'
    ],
  },
  {
    id: 'prod-6',
    name: 'Atomic Habits by James Clear - Hardcover',
    category: 'books',
    price: 549,
    originalPrice: 799,
    discountPercent: 31,
    rating: 4.9,
    ratingCount: 42100,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 150,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones. Over 15 million copies sold worldwide. Transform tiny changes into remarkable results.',
    features: [
      '#1 New York Times Bestseller',
      'Learn how small changes add up over time',
      'Framework for getting 1% better every day',
      'High-quality hardcover edition'
    ],
  },
  {
    id: 'prod-7',
    name: 'Nespresso Vertuo Pop Coffee Machine by Krups',
    category: 'home',
    price: 14999,
    originalPrice: 19999,
    discountPercent: 25,
    rating: 4.6,
    ratingCount: 1420,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 12,
    images: [
      'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Centrifusion technology reads the barcode on each capsule and automatically adjusts parameters to extract the best crema and aroma for four cup sizes.',
    features: [
      '4 cup sizes: Mug, Gran Lungo, Double Espresso, and Espresso',
      'Fast 30-second heat up time',
      'Compact design made from 35% recycled plastics',
      'Bluetooth and Wi-Fi smart connected'
    ],
  },
  {
    id: 'prod-8',
    name: 'Minimalist 10% Niacinamide Face Serum with Zinc (30ml)',
    category: 'beauty',
    price: 599,
    originalPrice: 699,
    discountPercent: 14,
    rating: 4.5,
    ratingCount: 8850,
    isDealOfTheDay: false,
    inStock: true,
    stockCount: 65,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    ],
    description: 'Nourishing daily face serum formulated with pure 10% Niacinamide (Vitamin B3) and Matmarine to soothe acne spots, blemish marks, and balance sebum.',
    features: [
      'Clinically proven to reduce acne marks and spots',
      'Formulated with pure high-grade Niacinamide from Lonza, Switzerland',
      'Oil-free, fragrance-free, and essential oil-free',
      'Suitable for all skin types'
    ],
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-729104-91',
    date: '2026-11-14',
    total: 69999,
    status: 'Delivered',
    currentStage: 3, // 0: Pending, 1: Shipped, 2: Out for delivery, 3: Delivered
    paymentMethod: 'Amazon Pay UPI',
    deliveryAddress: {
      fullName: 'Aarav Sharma',
      addressLine: 'Flat 402, Royal Palms, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 98765 43210',
    },
    items: [
      {
        id: 'prod-1',
        name: 'Apple iPhone 15 (128 GB) - Black',
        price: 69999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
        category: 'mobiles',
      },
    ],
  },
  {
    id: 'ORD-881204-12',
    date: '2026-11-17',
    total: 27539,
    status: 'Out for Delivery',
    currentStage: 2,
    paymentMethod: 'Google Pay',
    deliveryAddress: {
      fullName: 'Aarav Sharma',
      addressLine: 'Flat 402, Royal Palms, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      phone: '+91 98765 43210',
    },
    items: [
      {
        id: 'prod-2',
        name: 'Sony WH-1000XM5 Wireless Headphones',
        price: 26990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        category: 'electronics',
      },
      {
        id: 'prod-6',
        name: 'Atomic Habits by James Clear',
        price: 549,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=400&q=80',
        category: 'books',
      },
    ],
  },
];

export const INITIAL_ANALYTICS = [
  { category: 'Mobiles', earnings: 112998, orders: 2, color: '#ff9900' },
  { category: 'Electronics', earnings: 53980, orders: 2, color: '#146eb4' },
  { category: 'Appliances', earnings: 43990, orders: 1, color: '#007185' },
  { category: 'Fashion', earnings: 10497, orders: 3, color: '#c45500' },
  { category: 'Home', earnings: 29998, orders: 2, color: '#232f3e' },
  { category: 'Books', earnings: 3294, orders: 6, color: '#565959' },
];

