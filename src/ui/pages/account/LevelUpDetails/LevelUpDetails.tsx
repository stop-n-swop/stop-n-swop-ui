import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useAuthGuard } from 'application/auth';
import Details from 'ui/modules/account/about-me/Details';
import { useUser } from 'application/user';

export default function LevelUpDetails() {
  useAuthGuard();
  const redirect = useQueryParam('redirect');
  const { push } = useHistory();
  const getMessage = useGetMessage();
  const { data: user } = useUser();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card
        title={getMessage(ids.auth.levelUp.details.title)}
        className="flex-grow flex flex-col md:flex-grow-0 lg:w-2/3 xl:w-1/2"
      >
        <Details
          description={getMessage(ids.auth.levelUp.details.description)}
          submitText={getMessage(ids.auth.levelUp.submitText)}
          onSubmit={() => push(redirect)}
          mandatory
          showEmail={false}
          showUsername
          user={user}
        />
      </Card>
    </div>
  );
}
