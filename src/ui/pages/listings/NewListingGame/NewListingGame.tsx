import React, { useState } from 'react';
import { useMessage } from 'ui/intl';
import Card from 'ui/elements/Card';
import PageTitle from 'ui/elements/PageTitle';
import { ids } from 'ui/messages';
import GameFinder from 'ui/modules/listings/new/Game';
import Modal from 'ui/elements/Modal';
import Help from 'ui/help/listings/newListing.mdx';
import HavingTrouble from 'ui/help/listings/havingTrouble.mdx';
import type { Game, Platform } from '@sns/contracts/product';
import type { Query } from '@respite/core';

interface Props {
  productId: string;
  results: Game[];
  gameQuery: Query<Game>;
  platforms: Platform[];
  loading: boolean;
  onSearch(value: string): void;
  setProductId(value: string): void;
}

export default function NewListing({
  productId,
  results,
  platforms,
  onSearch,
  setProductId,
  gameQuery,
  loading,
}: Props) {
  const [showHow, setShowHow] = useState(false);
  const [showTrouble, setShowTrouble] = useState(false);

  return (
    <div className="flex-grow flex flex-col relative">
      <PageTitle>
        <span>{useMessage(ids.listings.new.pageTitle)}</span>
      </PageTitle>
      <div className="flex-grow flex flex-col md:justify-center md:items-center">
        <Card
          title={useMessage(ids.listings.new.title)}
          className="w-full max-w-screen-md flex-grow flex flex-col lg:flex-grow-0"
          innerClassName="flex-grow flex flex-col md:flex-grow-0"
        >
          <GameFinder
            productId={productId}
            platforms={platforms}
            results={results}
            onSearch={onSearch}
            setProductId={setProductId}
            openHowItWorks={() => setShowHow(true)}
            openTrouble={() => setShowTrouble(true)}
            gameQuery={gameQuery}
            loading={loading}
          />
        </Card>
      </div>
      <Modal
        isOpen={showHow}
        onClose={() => setShowHow(false)}
        title={useMessage(ids.listings.new.helpTitle)}
      >
        <div className="help">
          <Help />
        </div>
      </Modal>
      <Modal
        isOpen={showTrouble}
        title={useMessage(ids.listings.new.troubleTitle)}
        onClose={() => setShowTrouble(false)}
      >
        <div className="help">
          <HavingTrouble />
        </div>
      </Modal>
    </div>
  );
}
