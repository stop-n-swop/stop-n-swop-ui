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
      dashboard: 'my account',
      balance: 'balance',
      balancePill: 'claim',
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
      purchase: 'Buy now',
      details: 'More details',
      seller: 'Seller',
      description: 'Description',
      postage: '+ {postage} delivery',
      noPostage: 'Free delivery',
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
        help: 'How does it work?',
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
        subtitle: 'What next?',
        description:
          'It can take up to 30 minutes to finish checking and verifying your listing before it goes live',
        description2:
          "Your listing will soon appear on the game's page, we'll notify you when somebody places an order for it.",
        description3: [
          'You can then track and update the order from your ',
          'manage listing',
          ' page',
        ],
        description4: [
          'Before you can withdraw your earnings from a sold listing you will need to set up your ',
          'bank account',
          ' for the funds to be credited to. You will also need to ',
          'verify your identity',
          " so we know you're a real person!",
        ],
        manageListing: 'Manage your listing',
        viewListing: 'View your listing',
        newListing: 'Create another listing',
      },
      features: {
        title: 'Tell us more about your game!',
        boxed: 'Boxed',
        instructions: 'Instructions',
      },
      game: {
        label: "Find the game you want to sell and let's get listing...",
        button: 'List!',
        game: '{game} - {platform}',
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
        min: 'The minimum allowed price for a listing is {min}',
        label: 'Price',
        postage: 'Postage',
        platformFee: {
          title: 'Platform fee',
        },
        breakdown: {
          title: 'Price breakdown',
          price: 'Price:',
          postage: 'Postage:',
          platform: 'Platform fee:',
          protection: 'Order protection:',
          earnings: 'Earnings:',
        },
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
      hasActions: 'Action required!',
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
      details: {
        title: 'Your details',
        description:
          'We need to know a few basic details before you can begin trading on Stop N Swop...',
      },
      address: {
        description:
          'Please provide your current address details. This should be the same address that your bank account is registered at.',
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
      receivedModal: {
        trigger: 'Received...',
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
      [Status.NOT_RECEIVED]: "My item hasn't arrived yet",
      feedback: 'Leave feedback?',
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
          details: 'Details',
          address: 'Address',
        },
        billing: {
          label: 'Billing',
          account: 'Bank Account',
          verify: 'Verify',
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
          label: 'City',
        },
        postcode: {
          label: 'Post code / Zip',
        },
        country: {
          label: 'Country',
          supported: 'Unfortunately we only allow UK residents at this time',
        },
      },
      details: {
        title: 'Details',
        description: '',
        firstName: {
          label: 'First name',
        },
        lastName: { label: 'Last name' },
        dateOfBirth: { label: 'Date of birth' },
        nationality: { label: 'Nationality' },
      },
    },
    billing: {
      title: 'Bank account',
      description:
        "You'll need to provide your account number before you can receive any funds for your listings",
      account: {
        incomplete: {
          description:
            "Before you set up your account, you'll need to complete the Details and Address sections of your account",
          details: 'Details',
          address: 'Address',
        },
        hasAccount: {
          title: "You've already provided your bank account details",
          description:
            "We store your sensitive data securely, so you can't view your existing account number directly.",
          suggestion:
            'However, you can register a different account if you want:',
          edit: 'Enter new account details',
        },
        sortCode: {
          label: 'Sort code',
        },
        accountNumber: {
          label: 'Account number',
        },
        name: {
          label: 'Account holder name',
        },
        cancel: 'Cancel',
      },
      verify: {
        title: 'Verify your identity',
        incomplete: {
          description:
            "Before you begin identity verification, you'll need to complete the Details and Address sections of your account",
          details: 'Details',
          address: 'Address',
        },
        none: {
          description:
            'Before you can transfer your earnings into your account, we need to carry out a quick verification check...',
          action: 'Please upload a photo of your drivers licence or passport.',
          hint: 'Verifying your identity will also boost your seller rating!',
        },
        verifying: {
          description: 'We are currently processing your identification',
          hint: "This could take some time. We will let you know when you've been verified...",
        },
        failed: {
          description:
            'Unfortunately your identification could not be verified. Please try again.',
          action: 'Please upload a photo of your drivers licence or passport.',
        },
        oudated: {
          description:
            "Your identification has expired. You'll need to upload another item before you can continue receiving funds",
          action:
            'Please upload a photo of either your drivers licence or passport.',
        },
        verified: {
          description: 'Your identity has been verified',
          complete: "You're all set to start receiving earnings!",
          outstanding:
            'Make sure to provide your bank details to start receiving your earnings...',
        },
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
      obligates: {
        both: 'Before you can withdraw any funds you will need to set up your bank details and verify your identity',
        notVerified:
          'Before you can withdraw any funds you will need to verify your identity',
        verifying:
          'Your identity is still being processed. Once you have been verified you will be able to withdraw your funds',
        account:
          'Before you can withdraw any funds you will need to set up your bank details',
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
    billingAddress: {
      title: 'Billing Address',
      description:
        "Please confirm your billing address. This is the address that's linked to your payment method",
      useForDelivery: {
        label: 'My delivery address is the same',
      },
      next: 'Continue',
    },
    deliveryAddress: {
      title: 'Delivery Address',
      description:
        'Please enter the address you want this item to be delivered to',
      previous: 'Back',
      next: 'Continue',
    },
    payment: {
      description: 'Choose your payment method:',
      newCard: 'Use a new card',
      card: {
        number: '****{alias}',
      },
    },
    paymentNew: {
      title: 'Payment Details',
      name: {
        label: 'Name on card',
        required: 'Please enter your name as it appears on your card',
      },
      cardNumber: {
        label: 'Card number',
        required: 'Please enter the long number on the front of your card',
        length: 'This number should be {length} numbers long',
      },
      expiry: {
        label: 'Expiry date',
        required: 'Please enter the "expires end" date from your card',
        length: 'This should be in the format MM/YY',
      },
      cvc: {
        label: 'Security code',
        required:
          'Please enter the {length} digit security code from the back of your card',
      },
      remember: {
        label: 'Remember my details',
      },
      submit: 'Pay {amount}',
    },
    processing: {
      text: 'Processing your payment...',
    },
    complete: {
      title: 'Order placed!',
      myOrder: 'View order',
      games: 'Find more games',
    },
  },
  notices: {
    title: 'Notifications',
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
