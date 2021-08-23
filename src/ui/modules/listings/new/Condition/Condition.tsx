import React from 'react';
import cx from 'classnames';
import { Condition } from '@sns/contracts/listing';
import { FaGrinBeam, FaGrinStars, FaMeh, FaSmile } from 'react-icons/fa';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import OptionBox from 'ui/elements/OptionBox';
import { useMessage, useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import FieldError from 'ui/elements/FieldError';
import Buttons from '../Buttons';
import type { Values } from '../types';

const icons = [FaMeh, FaSmile, FaGrinBeam, FaGrinStars];

function Option({
  index,
  id,
  value,
  onChange,
}: {
  index: number;
  id: string;
  value: string;
  onChange(value: string): void;
}) {
  const Icon = icons[index];

  return (
    <OptionBox
      className={cx('p-2 w-1/2', 'sm:px-12 sm:py-6', 'lg:w-1/4')}
      selected={id === value}
      onClick={() => onChange(id)}
    >
      <Icon size="2em" />
      <span>{useMessage(ids.conditions[id])}</span>
    </OptionBox>
  );
}

export default function ConditionStep({ previous }: { previous(): void }) {
  const getMessage = useGetMessage();
  const isMounted = useIsMounted();
  const { setValue } = useFormContext<Values>();
  const value = useWatch<Values>({ name: 'condition' }) as Condition;

  return (
    <div>
      <Controller
        name="condition"
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
              return getMessage(ids.listings.new.condition.required);
            },
          },
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <div className="my-8 flex flex-wrap xl:px-28">
              {Object.values(Condition)
                .reverse()
                .map((id, i) => (
                  <Option
                    key={id}
                    id={id}
                    index={i}
                    onChange={(value) => {
                      onChange(value);
                      switch (value) {
                        case Condition.MINT:
                        case Condition.LIKE_NEW:
                          setValue('boxed', true);
                          setValue('instructions', true);
                          break;
                        default:
                          break;
                      }
                    }}
                    value={value}
                  />
                ))}
              <FieldError error={error} />
            </div>
          );
        }}
      />
      <div className="italic max-w-screen-sm mx-auto">
        <Choose>
          <When condition={value === Condition.MINT}>
            {getMessage(ids.listings.new.condition.descriptions.mint)}
          </When>
          <When condition={value === Condition.LIKE_NEW}>
            {getMessage(ids.listings.new.condition.descriptions.likeNew)}
          </When>
          <When condition={value === Condition.USED}>
            {getMessage(ids.listings.new.condition.descriptions.used)}
          </When>
          <When condition={value === Condition.POOR}>
            {getMessage(ids.listings.new.condition.descriptions.poor)}
          </When>
        </Choose>
      </div>
      <Buttons showNext previous={previous} />
    </div>
  );
}
