// Auth
// Queries
export const AuthKey = Symbol('auth');
export const TokensKey = Symbol('auth tokens');
// Actions
export const LogInKey = Symbol('log in');
export const LogOutKey = Symbol('log out');

// User
// Queries
export const UserKey = Symbol('user');
// Actions
export const UpdateUserKey = Symbol('update user');

// Games
// Queries
export const GamesKey = Symbol('games');
export const GameKey = Symbol('game');
export const GamesCountsKey = Symbol('games counts');

// Platforms
export const PlatformsKey = Symbol('platforms');

// Listings
// Queries
export const ListingRequirementsKey = Symbol('requirements');
export const ListingsKey = Symbol('listings');
export const ListingKey = Symbol('listing');
export const ListingCountKey = Symbol('count');
export const MyListingsKey = Symbol('my listings');
export const HistoryKey = Symbol('history');
export const AddressKey = Symbol('address');
// Actions
export const CreateListingKey = Symbol('create listing');
export const UpdateListingKey = Symbol('update listing');
export const ChangeListingStatusKey = Symbol('change listing status');

// Orders
// Queries
export const MyOrdersKey = Symbol('my orders');
export const ListingOrdersKey = Symbol('listing orders');
// Actions
export const ChangeStatusKey = Symbol('change status');
export const CreateOrderKey = Symbol('create order');
export const PatchOrderKey = Symbol('patch order');

// Notices
// Queries
export const NoticesKey = Symbol('notices');
export const ClearNoticesKey = Symbol('clear notices');

// Payments
// Queries
export const TransactionsKey = Symbol('transactions');
export const BalanceKey = Symbol('balance');
// Actions
export const WithdrawBalanceKey = Symbol('withdraw balance');
export const StartPaymentKey = Symbol('start payment');
export const CompletePaymentKey = Symbol('complete payment');
