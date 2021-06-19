import type { Game } from '@sns/contracts/product';

export type SearchGames = (args: {
  search: string;
  platforms: string[];
  available: boolean;
  page: number;
}) => Promise<{
  nextPage: number;
  games: Game[];
}>;

export type FetchCounts = (args: {
  search: string;
  platforms: string[];
  available: boolean;
}) => Promise<{
  total: number;
  platforms: Record<string, number>;
  available: number;
}>;

export type FetchGame = (args: { id: string }) => Promise<Game>;
