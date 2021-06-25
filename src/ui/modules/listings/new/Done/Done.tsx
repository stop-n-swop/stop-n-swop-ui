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
      <div className="flex flex-col items-center my-12 space-x-8">
        <h3 className="text-lg flex items-center space-x-4">
          <FaCheckCircle className="text-primary text-xl" />
          <span>{getMessage(ids.listings.new.done.description)}</span>
        </h3>
      </div>
      <div className="text-right mt-10 flex justify-end flex-col md:flex-row md:space-x-6">
        <Button kind="primary" component={Link} to={MY_LISTINGS}>
          {getMessage(ids.listings.new.done.listings)}
        </Button>
        <Button kind="tertiary" component={Link} to={NEW_LISTING}>
          {getMessage(ids.listings.new.done.newListing)}
        </Button>
      </div>
    </div>
  );
}
