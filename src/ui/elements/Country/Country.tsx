import { CountryOptions } from 'domain/constants';
import React, { useState } from 'react';
import fuzzy from 'fuzzy';
import Typeahead, { Props as TProps } from '../Typeahead';

type Props = Omit<TProps, 'options' | 'onSearch'>;

export default function Country(props: Props) {
  const [search, setSearch] = useState('');

  const options = CountryOptions.filter((o) => {
    if (!search) {
      return true;
    }
    if (o.value === props.value) {
      return true;
    }
    return fuzzy.test(search, o.label);
  });

  return <Typeahead {...props} options={options} onSearch={setSearch} />;
}
