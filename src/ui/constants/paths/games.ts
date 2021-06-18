export const GAMES = '/games';
export const GAME = '/games/:productId';
export const makeGamePath = ({ productId }: { productId: string }) =>
  `${GAMES}/${encodeURIComponent(productId)}`;
