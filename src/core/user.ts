import type { User, UpdateUserRequest } from '@sns/contracts/user';

export type GetUser = (args?: { username?: string }) => Promise<User>;

export type UpdateUser = (args: UpdateUserRequest) => Promise<void>;

export type FetchFavourites = () => Promise<string[]>;
export type FetchFavouritesLocal = FetchFavourites;
export type FetchFavouritesApi = FetchFavourites;

export type CreateFavourite = (args: { productId: string }) => Promise<void>;
export type CreateFavouriteLocal = CreateFavourite;
export type CreateFavouriteApi = CreateFavourite;

export type RemoveFavourite = (args: { productId: string }) => Promise<void>;
export type RemoveFavouriteLocal = RemoveFavourite;
export type RemoveFavouriteApi = RemoveFavourite;

export type ClearFavouritesLocal = () => Promise<void>;
export type ClearUser = () => Promise<void>;
