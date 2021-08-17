import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Username from 'ui/modules/account/about-me/Username';
import { useAuthGuard } from 'application/auth';
import { useUser } from 'application/user';

export default function LevelUpUsername() {
  useAuthGuard();
  const redirect = useQueryParam('redirect');
  const { push } = useHistory();
  const getMessage = useGetMessage();
  const { data: user } = useUser();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card
        title={getMessage(ids.account.aboutMe.username.title)}
        className="flex-grow md:flex-grow-0 flex flex-col"
      >
        <Username
          description={getMessage(ids.auth.levelUp.username.description)}
          submitText={getMessage(ids.auth.levelUp.submitText)}
          onSubmit={() => push(redirect)}
          user={user}
          fullWidth
        />
      </Card>
    </div>
  );
}
