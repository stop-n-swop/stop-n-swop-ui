import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { GAMES } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../../common/Block';
import BlockHeading from '../../common/BlockHeading';
import Reason from './Reason';
import Reasons from './Reasons';

export default function Buying() {
  const [search, setSearch] = useState('');
  const { push } = useHistory();
  const g = useGetMessage();

  return (
    <Block
      className="bg-opacity-90 md:bg-opacity-100 flex flex-col md:w-1/2 items-center"
      flush
    >
      <div className="space-y-4 flex-grow flex flex-col">
        <BlockHeading>{g(ids.home.new.buying.title)}</BlockHeading>
        <Reasons>
          {ids.home.new.buying.reasons.map(([text, description]) => (
            <Reason key={text} text={g(text)} description={g(description)} />
          ))}
        </Reasons>
        <div className="flex flex-col">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              push(`${GAMES}?q=${encodeURIComponent(search)}`);
            }}
            className="w-full"
          >
            <Input
              id="search"
              name="q"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              suffix={
                <Button
                  type="submit"
                  aria-label="Search"
                  kind="primary"
                  className="rounded-l-none space-x-3"
                >
                  <FaSearch />
                  <span className="hidden sm:inline md:hidden lg:inline">
                    {g(ids.home.new.buying.cta)}
                  </span>
                </Button>
              }
            />
          </form>
        </div>
      </div>
    </Block>
  );
}
