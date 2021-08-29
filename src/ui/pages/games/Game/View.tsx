import React, { useEffect } from 'react';
import Overview from 'ui/modules/games/view/Overview';
import QuickActions from 'ui/modules/games/view/QuickActions';
import { Link, useParams } from 'react-router-dom';
import { useGame } from 'application/games';
import { usePlatform } from 'application/platforms';
import PageTitle from 'ui/elements/PageTitle';
import { GAMES } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useResolve } from 'react-jpex';
import Favourite from 'ui/modules/product/Favourite';
import type { Emit } from 'core/events';
import ListingsArea from './ListingsArea';

export default function View() {
  const emit = useResolve<Emit>();
  const { productId } =
    useParams<{
      productId: string;
    }>();
  const { data: game } = useGame({ id: productId });
  const { data: platform } = usePlatform({ id: game.platformId });
  const getMessage = useGetMessage();

  useEffect(() => {
    emit('game_viewed', {
      gameId: game.gameId,
      platformId: game.platformId,
      productId: game.id,
    });
  }, [emit, game.gameId, game.id, game.platformId]);

  return (
    <>
      <PageTitle>
        <Link to={GAMES}>{getMessage(ids.games.title)}</Link>
        <span>{game.name}</span>
      </PageTitle>
      <div className="mx-auto container flex-grow flex flex-col">
        <Overview
          banner={game.banner}
          cover={game.cover}
          developer={game.developers[0]}
          publisher={game.publishers[0]}
          name={game.name}
          releaseDate={game.releaseDate}
          platform={platform.name}
        />
        <QuickActions
          productId={productId}
          favourite={
            <Favourite productId={productId} className="w-full justify-center">
              <span className="hidden md:block text-xs ml-3">
                {getMessage(ids.games.actions.favourite)}
              </span>
            </Favourite>
          }
          onCollectClick={() => null}
        />
        <ListingsArea productId={productId} />
      </div>
    </>
  );
}
