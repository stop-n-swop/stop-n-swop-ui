import React, { useMemo } from 'react';
import { FaRegStar, FaStarHalfAlt, FaStar } from 'react-icons/fa';

export default function StarRating({ rating }: { rating: number }) {
  const stars = useMemo(() => {
    const stars = [];
    // eslint-disable-next-line no-plusplus
    for (let x = 1; x <= 5; x++) {
      if (x <= rating) {
        stars.push(<FaStar key={x} />);
      } else if (x === Math.ceil(rating)) {
        stars.push(<FaStarHalfAlt key={x} />);
      } else {
        stars.push(<FaRegStar key={x} />);
      }
    }
    return stars;
  }, [rating]);

  return <div className="flex">{stars}</div>;
}
