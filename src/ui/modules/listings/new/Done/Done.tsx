import React from 'react';
import Button from 'ui/elements/Button';
import { MY_LISTINGS, NEW_LISTING } from 'ui/constants/paths';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Done() {
  const getMessage = useGetMessage();

  return (
    <div>
      <h3 className="text-lg flex items-center space-x-4">
        <span>{getMessage(ids.listings.new.done.title)}</span>
        <FaCheckCircle className="text-green-400 text-xl" />
      </h3>
      <p className="mt-6">{getMessage(ids.listings.new.done.description)}</p>
      <div className="text-right mt-10 flex justify-end flex-col md:flex-row md:space-x-6">
        <Button kind="primary" component={Link} to={MY_LISTINGS}>
          {getMessage(ids.listings.new.done.listings)}
        </Button>
        <Button kind="secondary" component={Link} to={NEW_LISTING}>
          {getMessage(ids.listings.new.done.newListing)}
        </Button>
      </div>
    </div>
  );
}
