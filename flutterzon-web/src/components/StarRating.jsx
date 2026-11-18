import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ rating = 0, count = null, size = 16, showScore = true }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.3;

  return (
    <div className="flex items-center gap-1.5 text-xs text-[#0F1111]">
      <div className="flex items-center text-[#DE7921]">
        {[...Array(5)].map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star
              key={i}
              size={size}
              className={`${
                isFilled
                  ? 'fill-[#DE7921] text-[#DE7921]'
                  : isHalf
                  ? 'fill-[#DE7921]/60 text-[#DE7921]'
                  : 'fill-transparent text-gray-300'
              }`}
            />
          );
        })}
      </div>
      {showScore && <span className="font-semibold text-sm">{rating.toFixed(1)}</span>}
      {count !== null && (
        <span className="text-[#007185] hover:text-[#C7511F] hover:underline cursor-pointer">
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
};

