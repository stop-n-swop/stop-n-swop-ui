import { Condition, Region } from 'core/constants/listings';
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
    upload: {
      placeholder: 'Drop your photo here',
      remove: 'Remove',
      close: 'Close',
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
      },
      price: {
        label: 'Price',
      },
      region: {
        label: 'Region',
      },
      rating: {
        label: 'Seller Rating',
      },
    },
    new: {
      pageTitle: 'New listing',
      productPageTitle: 'New listing for {name}',
      title: 'Create a listing',
      buttons: {
        back: 'Back',
        next: 'Next',
      },
      condition: {
        title: 'What condition is your game in?',
      },
      description: {
        title: "You can add a description if you'd like",
        label: 'Description',
      },
      done: {
        title: "That's it, you're listed!",
        description:
          'It can take up to 30 minutes to finish checking and verifying your listing before it goes live',
        listings: 'View my listings',
        newListing: 'List something else',
      },
      features: {
        title: 'Tell us more about your game!',
        boxed: 'Boxed',
        instructions: 'Instructions',
      },
      intro: {
        label: "Find a game you want to sell and let's get listing...",
        button: 'List',
      },
      photos: {
        required: 'Please upload a main photo',
        title: 'Upload some pictures of your game',
        description:
          "We automatically verify photos for authenticity. The more photos you add, the higher your listing's rating!",
      },
      price: {
        title: 'How much do you want to list this for?',
        link: 'Check listing prices for this game',
        required: 'Please enter an amount',
        label: 'Price',
      },
      region: {
        title: 'What region is your listing?',
      },
      review: {
        title: "Nearly there! Let's just check everything's correct:",
        submit: 'Looks good!',
      },
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
  regions: {
    [Region.PAL]: 'PAL',
    [Region.NTSCU]: 'NTSC-U',
    [Region.NTSCC]: 'NTSC-C',
    [Region.NTSCJ]: 'NTSC-J',
    unknown: 'Unknown region',
  },
  conditions: {
    [Condition.MINT]: 'Mint',
    [Condition.LIKE_NEW]: 'Like new',
    [Condition.USED]: 'Used',
    [Condition.POOR]: 'Poor',
    unknown: 'Unknown condition',
  },
  auth: {
    login: {
      title: 'Log in',
      username: {
        label: 'Username / Email',
        required: 'Please enter your username or email address',
      },
      password: {
        label: 'Password',
        required: 'Please enter your password',
      },
      buttons: {
        submit: 'Sign in',
        register: 'Register',
        forgot: 'Forgot your password?',
      },
    },
    register: {
      title: 'Register',
      buttons: {
        submit: 'Register',
      },
      email: {
        label: 'Email',
        required: 'Please enter your email address',
      },
      name: {
        label: 'Name',
        required: 'Please enter your name',
      },
      password: {
        label: 'Password',
        required: 'Create a password',
      },
      username: {
        label: 'Username',
        required: 'Enter a username',
      },
    },
  },
};

// this just creates us a deeply nested object of ids
// i.e. ids.signin.title === 'signin.title'
export const ids: typeof enMessages = unflatten(
  Object.fromEntries(Object.keys(flatten(enMessages)).map((key) => [key, key])),
);

export const en: Record<string, string> = flatten(enMessages);
