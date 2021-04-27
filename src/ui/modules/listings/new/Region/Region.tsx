import React from 'react';
import cx from 'classnames';
import { Region } from '@sns/contracts/listing';
import {
  GiEuropeanFlag,
  GiUsaFlag,
  GiJapan,
  GiMapleLeaf,
} from 'react-icons/gi';
import { Controller } from 'react-hook-form';
import OptionBox from 'ui/elements/OptionBox';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

const icons = {
  [Region.PAL]: GiEuropeanFlag,
  [Region.NTSCU]: GiUsaFlag,
  [Region.NTSCC]: GiMapleLeaf,
  [Region.NTSCJ]: GiJapan,
};

function Option({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange(value: string): void;
}) {
  const Icon = icons[id];

  return (
    <OptionBox
      className={cx('p-2 w-full', 'sm:w-1/2 sm:px-12 sm:py-6', 'lg:w-1/4')}
      selected={id === value}
      onClick={() => onChange(id)}
    >
      <Icon size="2em" />
      <span>{useMessage(ids.regions[id])}</span>
    </OptionBox>
  );
}

export default function RegionStep({ previous }: { previous(): void }) {
  return (
    <div>
      <h3 className="text-lg">{useMessage(ids.listings.new.region.title)}</h3>
      <Controller
        name="region"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <div className="my-8 flex flex-wrap xl:px-28">
            {Object.values(Region).map((id) => (
              <Option key={id} id={id} onChange={onChange} value={value} />
            ))}
          </div>
        )}
      />
      <Buttons previous={previous} />
    </div>
  );
}
