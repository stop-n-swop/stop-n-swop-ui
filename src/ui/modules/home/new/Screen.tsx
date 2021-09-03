import React, { ReactNode } from 'react';
import BuyingOrSelling from './BuyingOrSelling';
import Header from './Header';
import Intro from './Intro';
import OrderProtection from './OrderProtection/OrderProtection';
import SearchGames from './SearchGames';

export default function Screen({
  popular,
  recentlyAdded,
}: {
  popular: ReactNode;
  recentlyAdded: ReactNode;
}) {
  return (
    <div className="flex-grow flex flex-col container mx-auto space-y-8 lg:space-y-12">
      <div className="sm:space-y-8 xl:space-y-12">
        <div>
          <Header />
          <Intro />
          <BuyingOrSelling />
        </div>
        <div className="md:space-y-8 lg:space-y-12">
          <SearchGames />
          <OrderProtection />
        </div>
      </div>
      <div className="space-y-8 lg:space-y-12 pb-8">
        {popular}
        {recentlyAdded}
      </div>
    </div>
  );
}
