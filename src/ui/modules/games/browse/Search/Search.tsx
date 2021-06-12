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
    <div className="lg:w-2/3 xl:w-1/2 lg:mx-auto mb-4 lg:mb-8 xl:my-12 flex mx-6">
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
