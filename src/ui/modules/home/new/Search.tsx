import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { GAMES } from 'ui/constants/paths';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Block from '../common/Block';

const searchTerms = [
  '',
  'super mario',
  '',
  'sonic the hedgehog',
  '',
  'metal gear solid',
  '',
  'kirby',
];

const usePlaceholder = () => {
  const [placeholder, setPlaceholder] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const term = searchTerms[index];
    if (term === placeholder) {
      return undefined;
    }

    const h = setTimeout(() => {
      const nextChar = term.substr(placeholder.length, 1);
      setPlaceholder(placeholder + nextChar);
    }, 100);
    return () => clearTimeout(h);
  }, [index, placeholder]);

  useEffect(() => {
    const term = searchTerms[index];
    if (placeholder !== term) {
      return undefined;
    }
    const h = setTimeout(() => {
      setIndex((index) => {
        if (index >= searchTerms.length - 1) {
          return 0;
        }
        return index + 1;
      });
      setPlaceholder('');
    }, 2000);
    return () => clearTimeout(h);
  }, [index, placeholder]);

  return placeholder;
};

export default function Search() {
  const [search, setSearch] = useState('');
  const placeholder = usePlaceholder();
  const { push } = useHistory();
  const g = useGetMessage();

  return (
    <Block flush className="bg-opacity-90">
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
          placeholder={placeholder}
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suffix={
            <Button
              type="submit"
              aria-label="Search"
              kind="primary"
              className="rounded-l-none"
            >
              <FaSearch />
              <span className="hidden ml-3 sm:inline md:hidden lg:inline">
                {g(ids.home.new.buying.cta)}
              </span>
            </Button>
          }
        />
      </form>
    </Block>
  );
}
