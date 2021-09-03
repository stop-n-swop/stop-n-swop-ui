import React, { ReactNode } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useMessage } from 'ui/intl';
import Button from 'ui/elements/Button';
import Input from 'ui/elements/Input';
import { ids } from 'ui/messages';

interface Props {
  value: string;
  onChange(value: string): void;
  children?: ReactNode;
}

export default function Search({ onChange, value, children }: Props) {
  return (
    <div className="w-full xl:w-1/2 lg:mx-auto mb-4 flex bg-black lg:bg-opacity-70 px-8 pb-4">
      <Input
        id="browse_search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={useMessage(ids.games.search.label)}
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
