// Auth
// Queries
export const AuthKey = Symbol('auth');
export const TokensKey = Symbol('auth_tokens');
// Actions
export const LogInKey = Symbol('log_in');
export const LogOutKey = Symbol('log_out');

// User
// Queries
export const UserKey = Symbol('user');
// Actions
export const UpdateUserKey = Symbol('update_user');

// Games
// Queries
export const GamesKey = Symbol('games');
export const GameKey = Symbol('game');

// Platforms
export const PlatformsKey = Symbol('platforms');

// Listings
// Queries
export const ListingRequirementsKey = Symbol('listing_requirements');
export const ListingsKey = Symbol('listings');
export const ListingKey = Symbol('listing');
export const ListingCountKey = Symbol('listing_count');
export const MyListingsKey = Symbol('my_listings');
export const ListingHistoryKey = Symbol('listing_history');
// Actions
export const CreateListingKey = Symbol('create_listing');
export const UpdateListingKey = Symbol('update_listing');

// Basket
// Queries
export const BasketKey = Symbol('basket');
// Actions
export const AddToBasketKey = Symbol('add_to_basket');
