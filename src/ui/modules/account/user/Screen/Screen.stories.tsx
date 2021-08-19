import React from 'react';
import {
  ListingsList,
  ListingsItem,
  Actions,
} from 'ui/modules/listings/listings';
import { Provider as Intl } from 'ui/intl';
import { Provider as Jpex } from 'react-jpex';
import Purchase from 'ui/modules/listings/Purchase';
import { en } from 'ui/messages';
import { BrowserRouter } from 'react-router-dom';
import type { Config } from 'core/io';
import UserScreen from './Screen';
import Overview from '../Overview';

export default {
  title: 'modules / account / user / Screen',
};

export const Basic = () => {
  return (
    <Intl messages={en}>
      <BrowserRouter>
        <Jpex
          onMount={(jpex) => {
            const config: Config = {
              images: {
                url: '',
              },
            } as Config;
            jpex.constant<Config>(config);
          }}
        >
          <UserScreen
            username="jb"
            overview={
              <Overview
                completedListingsCount={10}
                user={{
                  address: {
                    location: 'London, United Kingdom',
                  } as any,
                  clientEmail: '',
                  email: '',
                  preferences: { manualApproval: false },
                  username: 'jb',
                  verified: true,
                  created: new Date(),
                }}
              />
            }
            listings={
              <ListingsList>
                <ListingsItem
                  image="https://via.placeholder.com/150"
                  location="London United Kingdom"
                  rating={0}
                  stats={{
                    boxed: true,
                    condition: null,
                    instructions: true,
                    region: null,
                  }}
                  username="jb"
                  style={{}}
                >
                  <Actions
                    listingId=""
                    productId=""
                    price={2000}
                    postage={0}
                    currency="GBP"
                    addToBasket={
                      <Purchase
                        listingId=""
                        className="text-sm"
                        listingStatus={'open' as any}
                        owned={false}
                      />
                    }
                  />
                </ListingsItem>
              </ListingsList>
            }
          />
        </Jpex>
      </BrowserRouter>
    </Intl>
  );
};
