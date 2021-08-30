import type { Game } from '@sns/contracts/product';

export type SearchGames = (args: {
  search: string;
  platforms: string[];
  available: boolean;
  page: number;
  group: boolean;
  favourites: boolean;
}) => Promise<{
  nextPage: number;
  games: Game[];
}>;

export type FetchCounts = (args: {
  search: string;
  platforms: string[];
  available: boolean;
  favourites: boolean;
}) => Promise<{
  total: number;
  platforms: Record<string, number>;
}>;

export type FetchPopularGames = () => Promise<Game[]>;

export type FetchGame = (args: { id: string }) => Promise<Game>;

export type TrackGameView = (args: { id: string }) => Promise<void>;
