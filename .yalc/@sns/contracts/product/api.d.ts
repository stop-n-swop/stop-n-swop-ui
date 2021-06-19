import { Game } from "./entities";
export interface SearchGamesRequest {
    page?: number;
    q?: string;
    platformIds?: string[];
    available?: boolean;
}
export interface SearchGamesResponse {
    nextPage: number;
    games: Game[];
}
export declare type GetGameParams = {
    gameId: string;
};
export declare type GetGameRequest = void;
export declare type GetGameResponse = Game;
export interface GetSearchCountsRequest {
    q?: string;
    platformIds?: string[];
    available?: boolean;
}
export interface GetSearchCountsResponse {
    total: number;
    available: number;
    platforms: Record<string, number>;
}
