import { Game } from "./entities";

export interface SearchGamesRequest {
  page?: number;
  q?: string;
  platformIds?: string[];
}

export interface SearchGamesResponse {
  nextPage: number;
  games: Game[];
  counts: {
    total: number;
    platforms: Record<string, number>;
  };
}

export type GetGameParams = { gameId: string };
export type GetGameRequest = void;
export type GetGameResponse = Game;
