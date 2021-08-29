import React from 'react';
import { AnchorButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../../common/Block';
import BlockHeading from '../../common/BlockHeading';

export default function OrderProtection() {
  const g = useGetMessage();
  const link = (
    <AnchorButton
      key="link"
      kind="tertiary"
      target="_blank"
      href="/guide/fees-and-charges/order-protection"
      className="inline-flex font-normal"
    >
      {g(ids.home.new.protection.linkText)}
    </AnchorButton>
  );

  return (
    <Block className="bg-opacity-80 md:bg-opacity-100">
      <BlockHeading>{g(ids.home.new.protection.title)}</BlockHeading>
      <div className="space-y-8">
        {ids.home.new.protection.text.map((id) => (
          <p key={id}>{g(id, { link })}</p>
        ))}
      </div>
    </Block>
  );
}
