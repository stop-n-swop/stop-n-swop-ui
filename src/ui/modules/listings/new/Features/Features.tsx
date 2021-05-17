import React, { ReactNode } from 'react';
import cx from 'classnames';
import { FaBookOpen, FaBox } from 'react-icons/fa';
import { Checkbox } from 'ui/elements/check';
import { Controller } from 'react-hook-form';
import OptionBox from 'ui/elements/OptionBox';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

const icons = {
  boxed: FaBox,
  instructions: FaBookOpen,
};

function Option({
  name,
  value,
  onChange,
  children,
}: {
  name: string;
  value: boolean;
  onChange(value: boolean): void;
  children: ReactNode;
}) {
  const Icon = icons[name];

  return (
    <OptionBox
      className={cx('p-2 w-1/2', 'md:w-1/3 lg:w-1/4 xl:w-1/5')}
      selected={value}
      onClick={() => onChange(!value)}
    >
      <Icon size="2em" />
      <span>{children}</span>
      <Checkbox value={value} kind={value ? 'primary' : 'secondary'} />
    </OptionBox>
  );
}

export default function FeaturesStep({ previous }: { previous(): void }) {
  const getMessage = useGetMessage();

  return (
    <div>
      <h3 className="text-lg">{getMessage(ids.listings.new.features.title)}</h3>
      <div className="my-8 flex flex-wrap justify-center md:space-x-12">
        <Controller
          name="boxed"
          defaultValue={false}
          render={({ field: { name, value, onChange } }) => (
            <Option name={name} value={value} onChange={onChange}>
              {getMessage(ids.listings.new.features.boxed)}
            </Option>
          )}
        />
        <Controller
          name="instructions"
          defaultValue={false}
          render={({ field: { name, value, onChange } }) => (
            <Option name={name} value={value} onChange={onChange}>
              {getMessage(ids.listings.new.features.instructions)}
            </Option>
          )}
        />
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
