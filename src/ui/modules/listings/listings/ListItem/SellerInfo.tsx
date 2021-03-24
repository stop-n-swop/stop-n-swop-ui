import React from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import Button from 'ui/elements/Button';
import { makeUserPath } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating';

export default function SellerInfo({
  username,
  rating,
}: {
  username: string;
  rating: number;
}) {
  return (
    <div className="text-sm text-gray-200 flex items-center">
      <div className="hidden sm:block mr-4">
        <Button
          padding={false}
          component={Link}
          to={makeUserPath({ userId: username })}
        >
          {username}
        </Button>
      </div>
      <StarRating rating={rating} />
      <Button kind="tertiary">
        <FaQuestionCircle className="text-sm" />
      </Button>
    </div>
  );
}
