/* eslint-disable symbol-description */
// Auth
// Queries
export const AuthKey = Symbol();
export const TokensKey = Symbol();
// Actions
export const LogInKey = Symbol();
export const LogOutKey = Symbol();

// User
// Queries
export const UserKey = Symbol();
// Actions
export const UpdateUserKey = Symbol();

// Games
// Queries
export const GamesKey = Symbol();
export const GameKey = Symbol();
export const PopularGamesKey = Symbol();
export const GamesCountsKey = Symbol();

// Platforms
export const PlatformsKey = Symbol();

// Companies
export const CompaniesKey = Symbol();

// Listings
// Queries
export const ListingRequirementsKey = Symbol();
export const ListingsKey = Symbol();
export const ListingKey = Symbol();
export const ListingCountKey = Symbol();
export const MyListingsKey = Symbol();
export const HistoryKey = Symbol();
export const AddressKey = Symbol();
export const SuggestionsKey = Symbol();
export const DiscountKey = Symbol();
// Actions
export const CreateListingKey = Symbol();
export const UpdateListingKey = Symbol();
export const ChangeListingStatusKey = Symbol();

// Orders
// Queries
export const MyOrdersKey = Symbol();
export const ListingOrdersKey = Symbol();
// Actions
export const ChangeStatusKey = Symbol();
export const CreateOrderKey = Symbol();
export const PatchOrderKey = Symbol();

// Notices
// Queries
export const NoticesKey = Symbol();
export const ClearNoticesKey = Symbol();

// Payments
// Queries
export const TransactionsKey = Symbol();
// Actions
export const WithdrawBalanceKey = Symbol();
export const StartPaymentKey = Symbol();
export const CompletePaymentKey = Symbol();

// Favourites
// Queries
export const FavouritesKey = Symbol();
// Actions
export const ToggleFavouriteKey = Symbol();
