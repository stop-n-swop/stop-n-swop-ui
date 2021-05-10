import type { Game } from '@sns/contracts/product';

export type SearchGames = (args: {
  search: string;
  platforms: string[];
  page: number;
}) => Promise<{
  nextPage: number;
  games: Game[];
  counts: {
    total: number;
    platforms: Record<string, number>;
  };
}>;

export type FetchGame = (args: { id: string }) => Promise<Game>;
