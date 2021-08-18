import React from 'react';
import cx from 'classnames';
import { Region } from '@sns/contracts/listing';
import {
  GiEuropeanFlag,
  GiUsaFlag,
  GiJapan,
  GiMapleLeaf,
} from 'react-icons/gi';
import { Controller, useFormContext } from 'react-hook-form';
import OptionBox from 'ui/elements/OptionBox';
import { useGetMessage, useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import FieldError from 'ui/elements/FieldError';
import Button from 'ui/elements/Button';
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
      className={cx('p-2 w-1/2', 'sm:px-12 sm:py-6', 'lg:w-1/4')}
      selected={id === value}
      onClick={() => onChange(id)}
    >
      <Icon size="2em" />
      <span>{useMessage(ids.regions[id])}</span>
    </OptionBox>
  );
}

export default function RegionStep({
  previous,
  next,
}: {
  previous(): void;
  next(): void;
}) {
  const isMounted = useIsMounted();
  const getMessage = useGetMessage();
  const { setValue } = useFormContext();

  return (
    <div>
      <Controller
        name="region"
        defaultValue=""
        rules={{
          validate: {
            required: (value) => {
              if (!isMounted()) {
                return true;
              }
              if (value) {
                return true;
              }
              return getMessage(ids.listings.new.region.required);
            },
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <div className="my-8 flex flex-wrap xl:px-28">
            {Object.values(Region).map((id) => (
              <Option key={id} id={id} onChange={onChange} value={value} />
            ))}
            <FieldError error={error} />
          </div>
        )}
      />
      <Buttons previous={previous}>
        <Button
          className="text-sm font-light"
          onClick={() => {
            setValue('region', '');
            next();
          }}
        >
          I'm not sure
        </Button>
      </Buttons>
    </div>
  );
}
