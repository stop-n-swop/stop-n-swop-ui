export const GAMES = '/games';
export const GAME = '/games/:platformId/:productId';
export const makeGamePath = ({
  platformId,
  productId,
}: {
  platformId: string;
  productId: string;
}) =>
  `${GAMES}/${encodeURIComponent(platformId)}/${encodeURIComponent(productId)}`;
