import React from 'react';
import cx from 'classnames';
import { InputController } from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { SelectController } from 'ui/elements/Select';
import Country from 'ui/elements/Country/Country';
import type { Address } from '@sns/contracts/user';

export default function AddressFields({
  address = {},
  fullWidth = false,
  className,
}: {
  address?: Partial<Address>;
  fullWidth?: boolean;
  className?: string;
}) {
  const getMessage = useGetMessage();
  const required = getMessage(ids.error.required);

  return (
    <div
      className={cx(
        'space-y-4 flex-grow',
        fullWidth || 'sm:w-1/2 sm:mx-auto',
        'lg:flex lg:flex-col lg:justify-center',
        className,
      )}
    >
      <div>
        <InputController
          id="address.line1"
          name="address.line1"
          label={getMessage(ids.account.aboutMe.address.line1.label)}
          defaultValue={address.line1 ?? ''}
          rules={{ required }}
          autoComplete="address-line1"
        />
      </div>
      {/* <div>
        <InputController
          id="address.line2"
          name="address.line2"
          label={getMessage(ids.account.aboutMe.address.line2.label)}
          defaultValue={address.line2 ?? ''}
          autocomplete="address-line2"
        />
      </div> */}
      <div>
        <InputController
          id="address.city"
          name="address.city"
          label={getMessage(ids.account.aboutMe.address.city.label)}
          defaultValue={address.city ?? ''}
          rules={{ required }}
          autoComplete="address-level2"
        />
      </div>
      <div>
        <InputController
          id="address.postcode"
          name="address.postcode"
          label={getMessage(ids.account.aboutMe.address.postcode.label)}
          defaultValue={address.postcode ?? ''}
          rules={{ required }}
          autoComplete="postal-code"
        />
      </div>
      <div>
        <SelectController
          Select={Country}
          id="address.country"
          name="address.country"
          label={getMessage(ids.account.aboutMe.address.country.label)}
          defaultValue={address.country || 'GB'}
          rules={{
            required,
            validate: {
              supportedCountry(value) {
                return (
                  value === 'GB' ||
                  getMessage(ids.account.aboutMe.address.country.supported)
                );
              },
            },
          }}
          options={[]}
        />
      </div>
    </div>
  );
}
