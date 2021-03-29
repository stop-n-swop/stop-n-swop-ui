import React from 'react';
import cx from 'classnames';
import { Condition } from 'core/constants/listings';
import { FaGrinBeam, FaGrinStars, FaMeh, FaSmile } from 'react-icons/fa';
import { Controller } from 'react-hook-form';
import OptionBox from 'ui/elements/OptionBox';
import { FormattedMessage } from 'react-intl';
import { ids } from 'ui/messages';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { NEW_LISTING } from 'ui/constants/paths';
import Buttons from '../Buttons';

const icons = [FaGrinStars, FaGrinBeam, FaSmile, FaMeh];

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
      type="submit"
      className={cx('p-2 w-full', 'sm:w-1/2 sm:px-12 sm:py-6', 'lg:w-1/4')}
      selected={id === value}
      onClick={() => onChange(id)}
    >
      <Icon size="2em" />
      <span>
        <FormattedMessage id={ids.conditions[id]} />
      </span>
    </OptionBox>
  );
}

export default function ConditionStep() {
  return (
    <div>
      <h2 className="text-lg">
        <FormattedMessage id={ids.listings.new.condition.title} />
      </h2>
      <Controller
        name="condition"
        defaultValue=""
        render={({ value, onChange }) => {
          return (
            <div className="my-8 flex flex-wrap xl:px-28">
              {Object.values(Condition).map((id, i) => (
                <Option
                  key={id}
                  id={id}
                  index={i}
                  onChange={onChange}
                  value={value}
                />
              ))}
            </div>
          );
        }}
      />
      <Buttons first showNext={false} previous={() => null}>
        <Button kind="secondary" component={Link} to={NEW_LISTING}>
          <FormattedMessage id={ids.listings.new.buttons.back} />
        </Button>
      </Buttons>
    </div>
  );
}
