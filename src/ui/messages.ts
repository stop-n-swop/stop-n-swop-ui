import { flatten, unflatten } from 'flat';

const enMessages = {
  nav: {
    title: 'Stop n Swop',
    menu: 'menu',
    basket: 'basket',
    browse: 'browse',
    collections: 'collections',
    listings: 'listings',
    account: {
      login: 'log in',
      logout: 'log out',
    },
  },
  elements: {
    checkbox: {
      expand: 'Show more',
      collapse: 'Show less',
    },
  },
  home: {
    title: 'Buy, sell, expand your retro collection',
    text: `
      Here is some introductory text about the site and the stuff it awesomely does
    `,
    browse: 'Find stuff',
    list: 'Sell stuff',
  },
  products: {
    title: 'Browse products',
    actions: {
      favourite: 'Favourite',
      list: 'List this game',
      collect: 'Add to collection',
    },
    search: {
      label: 'Search',
      results: {
        available: '{count} available',
        owner: '{developer} / {publisher}',
      },
    },
    filters: {
      preferences: {
        label: 'Preferences',
        favourites: 'Favourites',
        available: 'Available',
      },
      manufacturer: {
        label: 'Manufacturer',
      },
      platform: {
        label: 'Platform',
      },
    },
  },
  listings: {
    listing: {
      addToBasket: 'Add to basket',
      details: 'More details',
      seller: 'Seller',
      description: 'Description',
    },
    filters: {
      features: {
        label: 'Features',
        boxed: 'Boxed',
        unboxed: 'Unboxed',
        instructions: 'Instructions',
      },
      condition: {
        label: 'Condition',
        new: 'New',
        likeNew: 'Like new',
        veryGood: 'Very good',
        good: 'Good',
        poor: 'Poor',
      },
      price: {
        label: 'Price',
      },
      region: {
        label: 'Region',
        pal: 'PAL',
        ntscu: 'NTSC-U',
        ntscj: 'NTSC-J',
        unknown: 'Unknown region',
      },
      rating: {
        label: 'Seller Rating',
      },
    },
    new: {
      title: 'Create a listing',
    },
  },
  error: {
    unknown: 'An unknown error has ocurred',
    badRequest: 'Malformed request syntax',
    forbidden: 'You are not authorised to carry out this action',
    notFound: 'The requested resource could not be found or does not exist',
    conflict: 'Conflict in the current resource state',
    unavailable: 'The service is currently unavailable, please try again',
    gatewayTimeout: 'The service is currently unavailable, please try again',
  },
};

// this just creates us a deeply nested object of ids
// i.e. ids.signin.title === 'signin.title'
export const ids: typeof enMessages = unflatten(
  Object.fromEntries(Object.keys(flatten(enMessages)).map((key) => [key, key])),
);

export const en: Record<string, string> = flatten(enMessages);
