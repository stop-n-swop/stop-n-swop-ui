import React from 'react';
import { LinkButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../common/Block';

export default function Intro() {
  const g = useGetMessage();

  return (
    <Block className="bg-opacity-80 backdrop-blur-sm backdrop-filter relative">
      <div className="text-2xl text-center pb-4">
        {g(ids.home.new.intro.title)}
      </div>
      <div className="space-x-4 text-xs absolute right-2 bottom-1 text-gray-300">
        <span className="text-sm">{g(ids.home.new.intro.haveAnAccount)}</span>
        <LinkButton to="/login" className="inline-flex">
          {g(ids.home.new.intro.logIn)}
        </LinkButton>
      </div>
    </Block>
  );
}
