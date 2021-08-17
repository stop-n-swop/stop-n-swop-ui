import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Address from 'ui/modules/account/about-me/Address';
import { useAuthGuard } from 'application/auth';
import { useUser } from 'application/user';

export default function LevelUpAddress() {
  useAuthGuard();
  const redirect = useQueryParam('redirect');
  const { push } = useHistory();
  const getMessage = useGetMessage();
  const { data: user } = useUser();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card
        title={getMessage(ids.account.aboutMe.address.title)}
        className="flex-grow flex flex-col md:flex-grow-0 w-full max-w-screen-md"
      >
        <Address
          description={getMessage(ids.auth.levelUp.address.description)
            .split('\n')
            .map((chunk) => (
              <p>{chunk}</p>
            ))}
          submitText={getMessage(ids.auth.levelUp.submitText)}
          onSubmit={() => push(redirect)}
          user={user}
        />
      </Card>
    </div>
  );
}
