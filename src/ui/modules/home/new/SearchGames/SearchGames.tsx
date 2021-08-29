import React from 'react';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../../common/Block';
import BlockHeading from '../../common/BlockHeading';
import Content from './Content';
import Slider from './Slider';

export default function SearchGames() {
  return (
    <Block>
      <BlockHeading>{useMessage(ids.home.new.search.title)}</BlockHeading>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <Slider />
        <Content />
      </div>
    </Block>
  );
}
