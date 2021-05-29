import type { Basket } from '@sns/contracts/basket';

export type FetchMyBasket = () => Promise<Basket | null>;

export type AddToBasket = (args: { listingId: string }) => Promise<void>;
