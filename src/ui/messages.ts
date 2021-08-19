import { Condition, Region } from '@sns/contracts/listing';
import { Status } from '@sns/contracts/order';
import { flatten, unflatten } from 'flat';
import { Reason } from 'domain/constants/auth';

const enMessages = {
  help: {
    whatsThis: "What's this?",
  },
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
      dashboard: 'settings',
      balance: 'balance',
      profile: 'profile',
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
    select: {
      defaultLabel: '-- Select --',
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
        platformAvailable: '{count} platforms',
        owner: '{developer} / {publisher}',
        empty: 'Start searching to find your game',
        noResults: [
          "Looks like we couldn't find anything!",
          'Try searching something else or changing your filters',
        ],
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
    empty: {
      title: 'Looks like there are no listings for this game yet',
      button: 'Create a listing',
    },
    listing: {
      title: 'view listing',
      purchase: 'Buy now',
      owned: 'Manage',
      details: 'More details',
      seller: 'Seller',
      description: 'Description',
      postage: '+ {postage} delivery',
      noPostage: '',
      // noPostage: 'Free delivery',
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
      helpTitle: 'Listing a game',
      troubleTitle: 'Having trouble?',
      buttons: {
        help: 'How does it work?',
        trouble: 'Having trouble?',
        back: 'Back',
        next: 'Next',
      },
      condition: {
        title: 'What condition is your game in?',
        required: 'Tell us what condition your game is in',
      },
      description: {
        title: 'Extras',
        description: {
          label: 'Additional notes',
          maxLength: 'Your notes should be no longer than a tweet',
        },
      },
      done: {
        title: "That's it, you're listed!",
        subtitle: 'What next?',
        description:
          "Your listing will soon appear on the game's page, we'll notify you if somebody places an order for it.",
        description2: [
          'You can then track and update the order from your ',
          'manage listing',
          ' page',
        ],
        description3: [
          'Before you can withdraw your earnings from a sold listing you will need to set up your ',
          'bank account',
          ' for the funds to be credited to. You will also need to ',
          'verify your identity',
          " so we know you're a real person!",
        ],
        viewListing: 'View your listing',
        newListing: 'Create another listing',
      },
      features: {
        title: 'Tell us more about your game!',
        boxed: 'Boxed',
        instructions: 'Instructions',
      },
      game: {
        label: 'Find the game you want to sell to get started...',
        button: 'Get started',
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
        required: 'Please enter an amount',
        min: 'The minimum allowed price for a listing is {min}',
        label: 'Price',
        postage: 'Postage',
        platformFee: {
          title: 'Platform fee',
        },
        breakdown: {
          price: 'Price:',
          postage: 'Postage:',
          platform: 'Platform fee:',
          protection: 'Order protection:',
          earnings: 'You will make:',
        },
      },
      region: {
        title: 'What region code does your game have?',
        required: 'Please select a region',
        unknown: "I'm not sure",
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
      hasActions: 'Action required!',
      showAll: 'Show all',
    },
    myListing: {
      listing: 'Listing',
      order: 'Order',
      createdAt: 'Listing created',
      placedAt: 'Order placed',
      multiOrders: {
        title: 'There are several active orders for this listing:',
      },
      buyer: {
        label: 'Buyer',
      },
      seller: {
        label: 'Seller',
      },
      address: {
        label: 'Address',
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
    unknown: 'An unknown error has ocurred',
    required: 'Required',
    maxLength: 'Must be no more than {max} characters',
    title: "Uhoh this isn't right...",
    retryButton: 'Try again',
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
      details: {
        title: 'Your details',
        description:
          'We need to know a few basic details before you can begin trading on Stop N Swop...',
      },
      address: {
        description:
          'Please provide your current address details.\nThis should be the same address that your bank account is registered at.',
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
      showAll: 'Show all',
    },
    myOrder: {
      order: 'order',
      listing: 'listing',
      receivedModal: {
        trigger: 'Received',
        title: "You've received your order, that's great!",
        subtitle: 'Right?',
      },
    },
    actions: {
      edit: 'Edit',
      [Status.OPEN]: 'Open',
      [Status.CLOSED]: 'Close',
      [Status.PENDING]: 'Continue order',
      [Status.CANCELLED]: 'Cancel order',
      [Status.APPROVED]: 'Approve',
      [Status.DECLINED]: 'Decline',
      [Status.NOT_PAID]: 'Try again',
      [Status.POSTED]: 'Posted',
      [Status.RECEIVED]: 'All good!',
      [Status.DISPUTED]: "Something's wrong",
      [Status.NOT_RECEIVED]: "My order hasn't arrived yet",
      feedback: 'Leave feedback?',
      unposted: "Actually I haven't posted it yet...",
    },
    status: {
      [Status.OPEN]: 'Listed',
      [Status.CLOSED]: 'Closed',
      [Status.CREATED]: 'In progress',
      [Status.PENDING]: 'In progress',
      [Status.PAYING]: 'Payment in progress...',
      [Status.PLACED]: 'Order placed',
      [Status.NOT_PAID]: 'Payment failed',
      [Status.APPROVED]: 'Approved',
      [Status.DECLINED]: 'Declined',
      [Status.POSTED]: 'Posted',
      [Status.RECEIVED]: 'Received',
      [Status.DISPUTED]: 'Disputed',
      [Status.NOT_RECEIVED]: 'Not received',
      [Status.NO_RESPONSE]: 'No response',
      [Status.COMPLETE]: 'Complete',
      [Status.CANCELLED]: 'Cancelled',
    },
    declinedModal: {
      title: 'Why was my order declined?',
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
          address: 'Address',
        },
        billing: {
          label: 'Billing',
          account: 'PayPal Account',
        },
      },
    },
    saveButton: 'Save',
    aboutMe: {
      username: {
        title: 'Username',
        description:
          'Pick a username! This will be your public display name shown to other users',
        username: {
          label: 'Pick a username',
          required: 'Please enter a username',
          maxLength:
            'Your username should be no longer than {maxLength} characters',
        },
      },
      email: {
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
          label: 'Town/City',
        },
        postcode: {
          label: 'Post code',
          validPostcode: 'Please enter a valid postcode',
        },
        country: {
          label: 'Country',
          supported: 'Unfortunately we only allow UK residents at this time',
        },
      },
    },
    billing: {
      title: 'PayPal Account',
      description:
        "You'll need to provide your preferred PayPal email address before you can withdraw any funds from your listings",
      account: {
        clientEmail: {
          label: 'PayPal email address',
        },
        cancel: 'Cancel',
      },
    },
    balance: {
      balance: {
        label: 'Your balance',
        required: 'Please enter an amount',
        min: 'You must withddraw at least {min}',
        max: "You can't withdraw more than you have!",
        withdraw: 'Withdraw',
        confirm: 'Confirm',
        cancel: 'Cancel',
        completed:
          'Your funds are being transferred, it can take up to 48 hours to appear in your account.',
      },
      email: {
        label: 'Your PayPal account',
        required: 'Set up your PayPal account',
      },
      transactions: {
        title: 'Recent transactions',
        date: {
          label: 'Date',
        },
        listingId: {
          label: 'Listing',
        },
        transactionId: {
          label: 'Transaction',
        },
        type: {
          label: 'Transaction',
          'pay-in': 'Pay in',
          transfer: 'Completed sale',
          'pay-out': 'Withdrawal',
          refund: 'Refund',
          unknown: '',
        },
        amount: {
          label: 'Amount',
        },
        fees: {
          label: 'fees',
        },
      },
    },
    user: {
      created: 'Joined',
      completedCount: 'Sold items',
      location: 'Location',
      listings: 'Current listings',
    },
  },
  checkout: {
    intro: {
      title: 'Checkout',
      next: 'Continue',
      back: 'Back',
      seller: 'seller:',
      price: {
        price: 'Price:',
        postage: 'Postage:',
        protection: 'Order protection:',
        total: 'Total to pay:',
      },
      howItWorks: {
        button: 'How it works',
      },
      protectionGuide: {
        title: 'Buyer Protection',
      },
    },
    payment: {
      title: 'Pay {amount}',
      description: 'Choose your payment method',
    },
    complete: {
      title: 'Order placed!',
      myOrder: 'View order',
      games: 'Find more games',
    },
  },
  notices: {
    title: 'Notifications',
    clear: 'clear',
    states: {
      orderPlaced: {
        title: 'An order has been placed for your listing 🎉',
        subtitle:
          'Approve the order and arrange for your item to be delivered!',
        action: 'View',
      },
      orderCancelled: {
        title: 'An order for your listing has been cancelled by the buyer',
      },
      orderDeclined: {
        title: 'Your order has been declined by the seller',
        action: 'View',
        why: 'Why?',
      },
      orderNotPaid: {
        title: 'Your order payment has failed',
        subtitle: 'Ack!',
      },
      orderPosted: {
        title: 'Your order is on its way!',
        action: 'View',
      },
      orderReceived: {
        title: 'Your item has been received by the buyer',
      },
      orderExpiring: {
        title: 'Has your order turned up yet?',
        subtitle:
          'Let us know. After 10 days with no response your order will be closed and cannot be refunded',
        action: 'View',
      },
      orderNoResponse: {
        title: 'Your order has been completed',
        subtitle:
          "As you haven't told us whether your order arrived or not we assume everything's fine",
      },
      orderComplete: {
        title: 'Order completed',
        subtitle:
          'Your item has sold and the funds have been credited to your balance, hurray!',
        action: 'View',
      },
      kycVerified: {
        title: 'Your identity verification has passed!',
      },
      kycFailed: {
        title:
          'Your identity verification has failed. Please check your account settings for more info.',
        action: 'View',
      },
      orderRefunded: {
        title: 'Your order payment has been refunded to your account',
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
