import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Address from 'ui/modules/account/about-me/Address';
import { useAuthGuard } from 'application/auth';

export default function LevelUpAddress() {
  useAuthGuard();
  const redirect = useQueryParam('redirect');
  const { push } = useHistory();
  const getMessage = useGetMessage();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card className="flex-grow flex flex-col md:flex-grow-0 lg:w-2/3 xl:w-1/2">
        <Address
          title={getMessage(ids.account.aboutMe.address.title)}
          description={getMessage(ids.auth.levelUp.address.description)}
          submitText={getMessage(ids.auth.levelUp.submitText)}
          onSubmit={() => push(redirect)}
        />
      </Card>
    </div>
  );
}
