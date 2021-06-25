import React from 'react';
import cx from 'classnames';
import { InputController } from 'ui/elements/Input';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import type { Address } from '@sns/contracts/user';

export default function AddressFields({
  address = {},
}: {
  address?: Partial<Address>;
}) {
  const getMessage = useGetMessage();
  const required = getMessage(ids.error.required);

  return (
    <div
      className={cx(
        'space-y-4 flex-grow mt-8',
        'sm:w-1/2 sm:mx-auto',
        'lg:flex lg:flex-col lg:justify-center',
      )}
    >
      <div>
        <InputController
          id="address.line1"
          name="address.line1"
          label={getMessage(ids.account.aboutMe.address.line1.label)}
          defaultValue={address.line1 ?? ''}
          rules={{ required }}
        />
      </div>
      {/* <div>
        <InputController
          id="address.line2"
          name="address.line2"
          label={getMessage(ids.account.aboutMe.address.line2.label)}
          defaultValue={address.line2 ?? ''}
        />
      </div> */}
      <div>
        <InputController
          id="address.city"
          name="address.city"
          label={getMessage(ids.account.aboutMe.address.city.label)}
          defaultValue={address.city ?? ''}
          rules={{ required }}
        />
      </div>
      <div>
        <InputController
          id="address.postcode"
          name="address.postcode"
          label={getMessage(ids.account.aboutMe.address.postcode.label)}
          defaultValue={address.postcode ?? ''}
          rules={{ required }}
        />
      </div>
      <div>
        <InputController
          id="address.country"
          name="address.country"
          label={getMessage(ids.account.aboutMe.address.country.label)}
          defaultValue={address.country ?? ''}
          rules={{ required }}
        />
      </div>
    </div>
  );
}
