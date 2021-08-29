import React from 'react';
import { NEW_LISTING } from 'ui/constants/paths';
import { AnchorButton, LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../../common/Block';
import BlockHeading from '../../common/BlockHeading';
import Reason from './Reason';
import Reasons from './Reasons';

export default function Selling() {
  const g = useGetMessage();

  return (
    <Block className="flex flex-col">
      <BlockHeading>{g(ids.home.new.selling.title)}</BlockHeading>
      <Reasons>
        {ids.home.new.selling.reasons.map(([text, description]) => (
          <Reason key={text} text={g(text)} description={g(description)} />
        ))}
      </Reasons>
      <div className="flex items-center justify-between">
        <LinkButton kind="primary" to={NEW_LISTING} padding className="text-xl">
          {g(ids.home.new.selling.cta)}
        </LinkButton>
        <AnchorButton
          target="_blank"
          href="/guide/selling/choose-your-game"
          kind="tertiary"
          className="text-xs"
        >
          {g(ids.home.new.selling.help)}
        </AnchorButton>
      </div>
    </Block>
  );
}
