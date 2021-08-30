import { Game } from "./entities";
export interface SearchGamesRequest {
    page?: number;
    q?: string;
    platformIds?: string[];
    available?: boolean;
    group?: boolean;
    favourites?: boolean;
}
export interface SearchGamesResponse {
    nextPage: number;
    games: Game[];
}
export declare type GetPopularGamesRequest = {};
export declare type GetPopularGamesResponse = {
    games: Game[];
};
export declare type GetGameParams = {
    gameId: string;
};
export declare type GetGameRequest = void;
export declare type GetGameResponse = Game;
export interface GetSearchCountsRequest {
    q?: string;
    platformIds?: string[];
    available?: boolean;
    favourites?: boolean;
}
export interface GetSearchCountsResponse {
    total: number;
    platforms: Record<string, number>;
}
export declare type GameViwedParams = {
    productId: string;
};
export declare type GameViewedRequest = void;
export declare type GameViewedResponse = {};
