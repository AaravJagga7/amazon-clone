import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StarRating } from '../components/StarRating';
import {
  Heart,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export const ProductDetailsPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    wishlist,
    toggleWishlist,
    setCurrentView,
    navigateToHome,
    showToast,
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImage, setSelectedImage] = useState(
    product ? product.images[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [userRating, setUserRating] = useState(5);
  const [userReviewText, setUserReviewText] = useState('');
  const [reviewsList, setReviewsList] = useState([
    {
      author: 'Rohit K.',
      rating: 5,
      date: '12 November 2026',
      title: 'Verified Purchase - Best in class!',
      content: 'Exceeded all expectations. Quality is top notch and the delivery was prompt within 24 hours.',
    },
    {
      author: 'Priya Verma',
      rating: 4,
      date: '8 November 2026',
      title: 'Great value for money',
      content: 'Good design and works as advertised. Build quality feels premium.',
    },
  ]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center">
        <p className="text-base text-gray-700">Product not found.</p>
        <button
          onClick={navigateToHome}
          className="mt-4 bg-[#ffd814] px-4 py-2 rounded text-xs font-bold"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentView('checkout');
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!userReviewText.trim()) return;
    setReviewsList((prev) => [
      {
        author: 'You (Verified Buyer)',
        rating: userRating,
        date: 'Just now',
        title: 'Customer Review',
        content: userReviewText,
      },
      ...prev,
    ]);
    setUserReviewText('');
    showToast('Thank you! Your rating and review have been submitted.');
  };

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4 text-xs">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-gray-500 mb-4 text-[11px] overflow-hidden whitespace-nowrap">
        <span
          onClick={navigateToHome}
          className="hover:text-amazon-orange hover:underline cursor-pointer"
        >
          Home
        </span>
        <ChevronRight size={12} />
        <span className="capitalize hover:underline cursor-pointer">
          {product.category}
        </span>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium truncate max-w-md">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        {/* Col 1: Images Gallery (lg: 5 cols) */}
        <div className="lg:col-span-5 flex flex-col md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto">
            {product.images.map((img, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setSelectedImage(img)}
                onClick={() => setSelectedImage(img)}
                className={`w-14 h-14 rounded border-2 p-1 cursor-pointer overflow-hidden transition flex items-center justify-center bg-gray-50 ${
                  selectedImage === img
                    ? 'border-amber-500 shadow-sm'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Selected Image */}
          <div className="flex-1 order-1 md:order-2 h-80 sm:h-96 rounded-lg border border-gray-200 p-4 flex items-center justify-center bg-white relative group">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
            />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow border border-gray-200 text-gray-600 hover:text-red-500 transition"
              title="Add to Wish List"
            >
              <Heart
                size={18}
                className={isWishlisted ? 'fill-red-500 text-red-500' : ''}
              />
            </button>
          </div>
        </div>

        {/* Col 2: Details & Badges (lg: 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
            <StarRating rating={product.rating} count={product.ratingCount} size={15} />
            <span className="text-gray-300">|</span>
            <span className="text-[#007185] hover:underline cursor-pointer">
              1,000+ bought in past month
            </span>
          </div>

          {/* Price Section */}
          <div className="space-y-1 pb-3 border-b border-gray-200">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-normal text-[#cc0c39]">
                -{product.discountPercent}%
              </span>
              <span className="text-2xl font-bold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <p className="text-gray-500 text-[11px]">
              M.R.P.: <span className="line-through">₹{product.originalPrice.toLocaleString()}</span>
            </p>
            <p className="text-gray-700 text-[11px] font-medium">
              Inclusive of all taxes
            </p>
            <p className="text-gray-600 text-[11px] pt-1">
              <strong>EMI</strong> starts at ₹{(product.price / 12).toFixed(0)}. No Cost EMI available.
            </p>
          </div>

          {/* Product Quality Assurance Icons (from Flutterzon assets) */}
          <div className="grid grid-cols-4 gap-2 text-center py-2 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/product_quality_icons/replacement.png"
                alt="7 Days Replacement"
                className="w-8 h-8 object-contain mb-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-[10px] text-[#007185] font-medium leading-tight">
                7 days Replacement
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/product_quality_icons/free_delivery.png"
                alt="Free Delivery"
                className="w-8 h-8 object-contain mb-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-[10px] text-[#007185] font-medium leading-tight">
                Free Delivery
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/product_quality_icons/warranty.png"
                alt="Warranty"
                className="w-8 h-8 object-contain mb-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-[10px] text-[#007185] font-medium leading-tight">
                1 Year Warranty
              </span>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="/assets/images/product_quality_icons/pay_on_delivery.png"
                alt="Pay on Delivery"
                className="w-8 h-8 object-contain mb-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <span className="text-[10px] text-[#007185] font-medium leading-tight">
                Pay on Delivery
              </span>
            </div>
          </div>

          {/* About this item / Features */}
          <div>
            <h3 className="font-bold text-sm text-gray-900 mb-2">About this item</h3>
            <ul className="space-y-1.5 list-disc list-inside text-gray-700 leading-relaxed text-[11px]">
              {product.features ? (
                product.features.map((feat, i) => <li key={i}>{feat}</li>)
              ) : (
                <li>{product.description}</li>
              )}
            </ul>
          </div>
        </div>

        {/* Col 3: Buy Box (lg: 3 cols) */}
        <div className="lg:col-span-3 border border-gray-300 rounded-lg p-4 space-y-3 bg-gray-50/50 h-fit">
          <div className="text-xl font-bold text-gray-900">
            ₹{product.price.toLocaleString()}
          </div>

          <div className="text-gray-700 space-y-1 text-[11px]">
            <p className="flex items-center gap-1 text-emerald-700 font-semibold">
              <Sparkles size={13} />
              <span>FREE delivery <strong>Tomorrow</strong></span>
            </p>
            <p className="text-gray-500">
              Order within <span className="text-emerald-700 font-medium">4 hrs 12 mins</span>
            </p>
          </div>

          <div className="text-emerald-700 font-bold text-sm flex items-center gap-1">
            <CheckCircle2 size={16} />
            <span>In Stock ({product.stockCount || 10} left)</span>
          </div>

          {/* Quantity selector */}
          <div className="flex items-center gap-2">
            <label className="font-medium text-gray-700">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded px-2 py-1 outline-none text-xs"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(product, quantity)}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold py-2 rounded-full border border-[#fcd200] shadow-sm transition active:scale-95 text-xs"
          >
            Add to Cart
          </button>

          {/* Buy Now button */}
          <button
            onClick={handleBuyNow}
            className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-black font-semibold py-2 rounded-full border border-[#ff8f00] shadow-sm transition active:scale-95 text-xs"
          >
            Buy Now
          </button>

          <div className="pt-2 text-[10px] text-gray-500 space-y-1">
            <div className="flex justify-between">
              <span>Ships from:</span>
              <span className="font-medium text-gray-800">Flutterzon Direct</span>
            </div>
            <div className="flex justify-between">
              <span>Sold by:</span>
              <span className="font-medium text-[#007185]">RetailNet India</span>
            </div>
            <div className="flex justify-between">
              <span>Payment:</span>
              <span className="font-medium text-gray-800">Secure transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Submit Rating section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews & Ratings</h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Rating Summary & Write Review Form */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                {product.rating.toFixed(1)}
              </span>
              <div>
                <StarRating rating={product.rating} showScore={false} size={18} />
                <p className="text-gray-500 text-[11px] mt-0.5">
                  Based on {product.ratingCount.toLocaleString()} customer ratings
                </p>
              </div>
            </div>

            <form
              onSubmit={handleAddReview}
              className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3"
            >
              <h3 className="font-bold text-gray-800 text-xs">Rate & review this product</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Your Rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setUserRating(star)}
                      className="text-lg"
                    >
                      {star <= userRating ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={userReviewText}
                onChange={(e) => setUserReviewText(e.target.value)}
                placeholder="Share your thoughts about this product..."
                rows={3}
                className="w-full p-2 border border-gray-300 rounded text-xs outline-none focus:border-amber-500 bg-white"
              />
              <button
                type="submit"
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-black font-semibold px-4 py-1.5 rounded-full border border-[#fcd200] text-xs"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Reviews list */}
          <div className="md:col-span-7 space-y-4 divide-y divide-gray-100">
            {reviewsList.map((review, i) => (
              <div key={i} className="pt-3 first:pt-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 text-[10px]">
                    {review.author[0]}
                  </div>
                  <span className="font-semibold text-gray-800">{review.author}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} showScore={false} size={12} />
                  <span className="font-bold text-gray-900">{review.title}</span>
                </div>
                <p className="text-gray-400 text-[10px] mb-1.5">
                  Reviewed in India on {review.date}
                </p>
                <p className="text-gray-700 leading-relaxed">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

