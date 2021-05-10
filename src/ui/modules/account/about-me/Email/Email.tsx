import React from 'react';
import Input from 'ui/elements/Input';
import { useUser } from 'application/user';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

export default function Email() {
  const { data: user } = useUser();
  const getMessage = useGetMessage();

  return (
    <div>
      <h3 className="text-lg font-bold">
        {getMessage(ids.account.aboutMe.email.title)}
      </h3>
      <p className="text-sm text-gray-100 italic">
        {getMessage(ids.account.aboutMe.email.description)}
      </p>
      <div className="flex flex-col flex-grow">
        <div className="flex-grow my-8 lg:my-20 w-full md:w-1/2 mx-auto">
          <Input
            id="email"
            disabled
            label={getMessage(ids.account.aboutMe.email.email.label)}
            defaultValue={user.email ?? ''}
          />
        </div>
      </div>
    </div>
  );
}
