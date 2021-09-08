import React, { ReactNode, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';
import cx from 'classnames';

interface Props {
  value: string;
  onChange(value: string): void;
  children?: ReactNode;
}

export default function Search({ onChange, value, children }: Props) {
  const [focused, setFocus] = useState(false);

  return (
    <div
      className={cx(
        'w-full xl:w-1/2 lg:mx-auto lg:mb-4 flex bg-black lg:bg-opacity-70 px-8 pb-4',
        value || focused ? 'lg:mt-0 lg:pt-4' : 'lg:mt-4 lg:pt-0',
      )}
      style={{
        transition: 'padding-top 150ms, margin-top 150ms',
      }}
    >
      <Input
        id="browse_search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        label={useMessage(ids.games.search.label)}
        autoComplete="off"
        suffix={
          <Button aria-label="Search">
            <FaSearch />
          </Button>
        }
      />
      {children}
    </div>
  );
}
