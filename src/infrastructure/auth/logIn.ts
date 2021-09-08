import jpex from 'jpex';
import type { LogIn } from 'core/auth';
import type { Driver } from 'core/io';
import type { LoginRequest, LoginResponse } from '@sns/contracts/user';
import type {
  ClearFavouritesLocal,
  ClearUser,
  FetchFavouritesLocal,
} from 'core/user';

const logIn =
  (
    driver: Driver,
    fetchFavourites: FetchFavouritesLocal,
    clearFavourites: ClearFavouritesLocal,
    clearUser: ClearUser,
  ): LogIn =>
  async ({ provider, token }) => {
    const favourites = await fetchFavourites();

    const response = await driver<LoginRequest, LoginResponse>({
      url: '/auth/sessions',
      method: 'POST',
      data: { provider, token, favouriteProductIds: favourites },
    });

    await clearFavourites();
    await clearUser();

    const {
      data: { authToken, refreshToken, userId },
    } = response;

    return { authToken, refreshToken, userId };
  };

jpex.factory<LogIn>(logIn);
