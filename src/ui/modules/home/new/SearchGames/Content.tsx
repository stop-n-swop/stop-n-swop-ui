import React from 'react';
import { GAMES } from 'ui/constants/paths';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Content() {
  const g = useGetMessage();

  return (
    <div className="flex-grow space-y-8">
      {ids.home.new.search.text.map((id) => (
        <p key={id}>{g(id)}</p>
      ))}
      <div>
        <LinkButton padding to={GAMES} kind="secondary" className="inline-flex">
          {g(ids.home.new.search.cta)}
        </LinkButton>
      </div>
    </div>
  );
}
