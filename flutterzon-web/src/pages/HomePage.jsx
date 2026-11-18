import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  CATEGORIES,
  HERO_BANNERS,
  FOUR_IMAGE_OFFERS,
  BOTTOM_OFFERS,
} from '../data/initialData';
import { StarRating } from '../components/StarRating';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const HomePage = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    navigateToProduct,
    addToCart,
  } = useApp();

  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // Auto rotate banners
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filter products by category and search
  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const dealOfTheDay = products.find((p) => p.isDealOfTheDay) || products[0];

  return (
    <div className="pb-12 max-w-[1500px] mx-auto px-2 sm:px-4">
      {/* 1. Category Bar Strip (like mobile / web Amazon) */}
      <div className="bg-white rounded shadow-sm my-2 p-3 overflow-x-auto">
        <div className="flex items-center gap-6 min-w-max">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchQuery('');
                }}
                className={`flex flex-col items-center cursor-pointer group transition transform hover:scale-105 ${
                  isSelected ? 'scale-105' : ''
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-full p-0.5 border-2 transition overflow-hidden flex items-center justify-center bg-gray-50 ${
                    isSelected ? 'border-amber-500 shadow-md ring-2 ring-amber-300' : 'border-transparent group-hover:border-gray-300'
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80';
                    }}
                  />
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium whitespace-nowrap ${
                    isSelected ? 'text-amber-600 font-bold' : 'text-gray-700 group-hover:text-amber-600'
                  }`}
                >
                  {cat.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Hero Banner Carousel */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="relative mb-6 rounded-lg overflow-hidden shadow-md">
          <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
            {HERO_BANNERS.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex flex-col justify-end p-6 md:p-12 ${
                  index === activeBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                {/* Background image & gradient */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 w-full h-full object-cover object-center filter brightness-50"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${banner.bgColor} opacity-60`} />

                {/* Content */}
                <div className="relative z-20 max-w-2xl text-white">
                  <span className="inline-block bg-[#cc0c39] text-white text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded mb-2 shadow">
                    {banner.badge}
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2 drop-shadow">
                    {banner.title}
                  </h1>
                  <p className="text-sm sm:text-lg text-gray-100 mb-4 font-medium drop-shadow">
                    {banner.subtitle}
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory(banner.category);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-6 py-2.5 rounded-md shadow-lg text-sm transition transform active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>{banner.ctaText}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls */}
          <button
            onClick={() =>
              setActiveBannerIndex(
                (prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length
              )
            }
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() =>
              setActiveBannerIndex((prev) => (prev + 1) % HERO_BANNERS.length)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>

          {/* Indicator dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {HERO_BANNERS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveBannerIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeBannerIndex ? 'w-6 bg-amber-400' : 'w-2 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. 4-Image Offer Cards & Deal of the Day Grid */}
      {!searchQuery && selectedCategory === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {FOUR_IMAGE_OFFERS.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition border border-gray-100"
            >
              <div>
                <h3 className="font-bold text-base text-gray-900 mb-3 leading-snug">
                  {offer.title}
                </h3>
                <div className="grid grid-cols-2 gap-2.5">
                  {offer.items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCategory(offer.category)}
                      className="cursor-pointer group"
                    >
                      <div className="h-28 rounded overflow-hidden bg-gray-100 mb-1">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      <p className="text-[11px] text-gray-800 line-clamp-1 font-medium">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-emerald-700 font-bold">
                        {item.discount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory(offer.category)}
                className="mt-3 text-xs text-[#007185] hover:text-[#c45500] hover:underline font-semibold text-left"
              >
                {offer.footerText} →
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 4. Deal of the Day Feature Banner */}
      {!searchQuery && dealOfTheDay && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-5 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#cc0c39] text-white text-xs font-black uppercase px-2.5 py-0.5 rounded flex items-center gap-1 shadow">
                  <Zap size={13} />
                  Deal of the Day
                </span>
                <span className="text-xs text-gray-600 flex items-center gap-1 font-medium">
                  <Clock size={13} /> Ends in 08h 42m 19s
                </span>
              </div>
              <h2
                onClick={() => navigateToProduct(dealOfTheDay.id)}
                className="text-xl md:text-2xl font-bold text-gray-900 hover:text-[#007185] cursor-pointer transition line-clamp-2"
              >
                {dealOfTheDay.name}
              </h2>
              <div className="my-2">
                <StarRating rating={dealOfTheDay.rating} count={dealOfTheDay.ratingCount} />
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-[#b12704]">
                  ₹{dealOfTheDay.price.toLocaleString()}
                </span>
                <span className="text-xs text-gray-500 line-through">
                  M.R.P.: ₹{dealOfTheDay.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-[#cc0c39] text-white font-bold px-1.5 py-0.5 rounded">
                  {dealOfTheDay.discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-gray-600 mt-2 line-clamp-2 max-w-xl">
                {dealOfTheDay.description}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => addToCart(dealOfTheDay)}
                  className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold text-xs py-2 px-5 rounded-full border border-[#fcd200] shadow-sm transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => navigateToProduct(dealOfTheDay.id)}
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold text-xs py-2 px-4 rounded-full border border-gray-300 shadow-sm transition"
                >
                  View Details
                </button>
              </div>
            </div>

            <div
              onClick={() => navigateToProduct(dealOfTheDay.id)}
              className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white p-2 rounded-lg shadow-sm cursor-pointer overflow-hidden border border-gray-200"
            >
              <img
                src={dealOfTheDay.images[0]}
                alt={dealOfTheDay.name}
                className="w-full h-full object-contain hover:scale-105 transition duration-300"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. Product Catalog Grid */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 capitalize">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : selectedCategory === 'all'
                ? 'Featured Products & Best Deals'
                : `${selectedCategory} Store`}
            </h2>
            <p className="text-xs text-gray-500">
              Showing {filteredProducts.length} items
            </p>
          </div>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#007185] hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="font-bold text-lg text-gray-700">No products found</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              We couldn't find anything matching your search or filter. Try checking your spelling or clear your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 bg-[#ffd814] text-black text-xs font-semibold px-4 py-2 rounded-md"
            >
              Show All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between border border-gray-100 group"
              >
                <div>
                  {/* Image container */}
                  <div
                    onClick={() => navigateToProduct(product.id)}
                    className="h-48 w-full bg-gray-50 rounded p-2 mb-3 cursor-pointer overflow-hidden flex items-center justify-center relative"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                    />
                    {product.discountPercent > 20 && (
                      <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        {product.discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => navigateToProduct(product.id)}
                    className="text-xs font-semibold text-gray-900 hover:text-[#c45500] cursor-pointer line-clamp-2 mb-1.5 leading-snug"
                  >
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="mb-2">
                    <StarRating rating={product.rating} count={product.ratingCount} size={14} />
                  </div>

                  {/* Pricing */}
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-xs align-super font-normal text-gray-800">₹</span>
                    <span className="text-lg font-bold text-gray-900">
                      {product.price.toLocaleString()}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-500 flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-500" />
                    <span>Free Delivery by <strong>Tomorrow</strong></span>
                  </p>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-4 bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-semibold py-2 rounded-full border border-[#fcd200] shadow-sm transition active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. Bottom Offers Strip (Recharge, Amazon Pay, Rewards, etc.) */}
      <div className="bg-white rounded-lg p-5 shadow-sm mt-8 border border-gray-100">
        <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
          <span>Amazon Services & Daily Offers</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {BOTTOM_OFFERS.map((offer, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-2 rounded hover:bg-gray-50 cursor-pointer transition border border-transparent hover:border-gray-200"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 bg-amber-50 flex items-center justify-center p-1">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = '/assets/images/amazon_black_logo.png';
                  }}
                />
              </div>
              <span className="text-xs font-bold text-gray-800">{offer.name}</span>
              <span className="text-[10px] text-gray-500 leading-tight mt-0.5">
                {offer.subtitle}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

