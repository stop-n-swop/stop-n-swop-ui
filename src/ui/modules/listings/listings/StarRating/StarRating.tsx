import React, { useMemo } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

export default function StarRating({ rating }: { rating: number }) {
  const stars = useMemo(() => {
    const stars = [];
    // eslint-disable-next-line no-plusplus
    for (let x = 1; x <= 5; x++) {
      if (x <= rating) {
        stars.push(<FaStar />);
      } else if (x === Math.ceil(rating)) {
        stars.push(<FaStarHalfAlt />);
      } else {
        stars.push(<FaRegStar />);
      }
    }
    return stars;
  }, [rating]);

  return <div className="flex">{stars}</div>;
}
