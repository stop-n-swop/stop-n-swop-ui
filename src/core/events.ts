/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable camelcase */
interface Events {
  session_expired: {};
  logged_in: {};
  logged_out: {};
  listing_created: {
    listingId: string;
    price: number;
    postage: number;
    currency: string;
  };
  listing_updated: {
    listingId: string;
    price: number;
    postage: number;
    currency: string;
  };
  game_viewed: {
    productId: string;
    gameId: string;
    platformId: string;
  };
  order_created: {
    listingId: string;
    orderId: string;
  };
  payment_completed: {
    orderId: string;
  };
  payment_started: {
    orderId: string;
  };
  manual_withdrawal: {
    amount: number;
    currency: string;
  };
}

type EventKey = keyof Events;

export interface Emit {
  <K extends EventKey>(key: K, data: Events[K]): void;
}

export interface Subscribe {
  <K extends EventKey>(key: K, callback: (data: Events[K]) => any): void;
}
