import { Condition, Region } from '@sns/contracts/listing';
import { Status } from '@sns/contracts/order';
import { flatten, unflatten } from 'flat';
import { Reason } from 'domain/constants/auth';

const enMessages = {
  nav: {
    title: 'Stop n Swop',
    menu: 'menu',
    basket: 'basket',
    games: 'games',
    collections: 'my collections',
    listings: 'my listings',
    list: 'list',
    orders: 'my orders',
    account: {
      login: 'log in',
      logout: 'log out',
      dashboard: 'my account',
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
  games: {
    title: 'Games',
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
        empty: 'Find a game!',
      },
    },
    filters: {
      preferences: {
        label: 'Preferences',
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
      postage: '{postage} delivery',
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
        required: 'Tell us what condition your game is in',
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
      platform: {
        label: 'What platform are we talking?',
        button: 'Next',
      },
      game: {
        label: "Find the game you want to sell and let's get listing...",
        button: 'List!',
      },
      photos: {
        required: 'This photo is required',
        title: 'Upload some pictures of your game',
        description:
          "We automatically verify photos for authenticity. The more photos you add, the higher your listing's rating!",
        unknown: 'Photo',
        'cartridge-front': 'Game Cartridge (front)',
        'cartridge-back': 'Game Cartridge (back)',
        'cartridge-inside': 'Game Cartridge (inside)',
        disc: 'Game Disc',
        'box-front': 'Front of box',
        'box-back': 'Back of box',
        instructions: 'Instructions',
      },
      price: {
        title: 'How much do you want to list this for?',
        link: 'Check listing prices for this game',
        required: 'Please enter an amount',
        label: 'Price',
        postage: 'Postage',
      },
      region: {
        title: 'What region is your listing?',
        required: 'Please select a region',
      },
      review: {
        title: "Nearly there! Let's just check everything's correct:",
        submit: 'Looks good!',
      },
      error: {
        title: 'Uhoh looks like something went wrong!',
        back: 'Review my listing',
      },
    },
    edit: {
      title: 'Edit',
    },
    myListings: {
      title: 'My listings',
      listButton: 'Create a new listing',
    },
    myListing: {
      listing: 'Listing',
      order: 'order',
      multiOrders: {
        title: 'There are several active orders for this listing:',
      },
      buyer: {
        label: 'Buyer',
      },
      status: {
        label: 'Status',
      },
      history: {
        label: 'Order history',
        headers: {
          date: 'Date/Time',
          username: 'User',
          status: 'Status',
        },
      },
    },
  },
  error: {
    retryButton: 'Refresh',
    forbidden: 'You are not authorised to carry out this action',
    unavailable: 'The service is currently unavailable, please try again',
    gatewayTimeout: 'The service is currently unavailable, please try again',
    unknown: 'An unknown error has ocurred',
    required: 'Required',
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
      google: 'Continue with Google',
    },
    levelUp: {
      submitText: 'Continue',
      username: {
        description: "Before we continue, you'll need to set a username...",
      },
      address: {
        description: 'Youll need to provide your address to continue...',
      },
      reason: {
        [Reason.LOGIN_REQUIRED]: 'Please log in to continue...',
        [Reason.SESSION_EXPRED]:
          'Your session has expired, please log in again...',
      },
    },
  },
  order: {
    myOrders: {
      title: 'My Orders',
      empty: "Looks like you haven't got any orders yet",
    },
    myOrder: {
      order: 'order',
      listing: 'listing',
    },
    actions: {
      edit: 'Edit',
      [Status.OPEN]: 'Open',
      [Status.CLOSED]: 'Close',
      [Status.CANCELLED]: 'Cancel order',
      [Status.APPROVED]: 'Approve',
      [Status.DECLINED]: 'Decline',
      [Status.POSTED]: 'Posted',
      [Status.RECEIVED]: 'Received',
      feedback: 'Leave feedback?',
    },
    status: {
      [Status.OPEN]: 'Listed',
      [Status.CLOSED]: 'Closed',
      [Status.CREATED]: 'Order placed',
      [Status.APPROVED]: 'Processing payment',
      [Status.DECLINED]: 'Declined',
      [Status.PAID]: 'Paid',
      [Status.NOT_PAID]: 'Payment failed',
      [Status.POSTED]: 'Posted',
      [Status.RECEIVED]: 'Received',
      [Status.CANCELLED]: 'Cancelled',
    },
  },
  account: {
    dashboard: {
      title: 'My account',
      welcome: 'Welcome {name}!',
      sections: {
        aboutMe: {
          label: 'About me',
          username: 'Username',
          email: 'Email',
          address: 'Address',
        },
        orders: 'Orders',
        listings: 'Listings',
      },
    },
    saveButton: 'Save',
    aboutMe: {
      username: {
        title: 'Username',
        description:
          'Pick a username! This will be your public display name shown to other users',
        username: {
          label: 'Your username',
          required: 'Please enter a username',
          maxLength:
            'Your username should be no longer than {maxLength} characters',
        },
      },
      email: {
        title: 'Email',
        description:
          "We'll use your email to send you notifications and receipts",
        email: {
          label: 'Your email address',
        },
      },
      address: {
        title: 'Address',
        description:
          "You'll need an address so we know where to send things. Setting an address will also improve your seller rating!",
        line1: {
          label: 'Line 1',
        },
        line2: {
          label: 'Line 2',
        },
        city: {
          label: 'City',
        },
        postcode: {
          label: 'Post code / Zip',
        },
        country: {
          label: 'Country',
        },
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
