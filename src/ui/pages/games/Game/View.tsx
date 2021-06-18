import React, { useState } from 'react';
import Overview from 'ui/modules/games/view/Overview';
import QuickActions from 'ui/modules/games/view/QuickActions';
import { Link, useParams } from 'react-router-dom';
import { useGame } from 'application/games';
import { usePlatform } from 'application/platforms';
import PageTitle from 'ui/elements/PageTitle';
import { GAMES } from 'ui/constants/paths';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import ListingsArea from './ListingsArea';

export default function View() {
  const [favourite, setFavourite] = useState(false);
  const { productId } =
    useParams<{
      productId: string;
    }>();
  const { data: game } = useGame({ id: productId });
  const { data: platform } = usePlatform({ id: game.platformId });
  const getMessage = useGetMessage();

  return (
    <>
      <PageTitle>
        <Link to={GAMES}>{getMessage(ids.games.title)}</Link>
        <span>{game.name}</span>
      </PageTitle>
      <div className="xl:w-4/5 xl:mx-auto flex-grow flex flex-col">
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
          platformId={game.platformId}
          productId={productId}
          favourite={favourite}
          onFavouriteClick={() => setFavourite(!favourite)}
          onCollectClick={() => null}
        />
        <ListingsArea productId={productId} />
      </div>
    </>
  );
}
