import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'ui/elements/Card';
import { useQueryParam } from 'ui/hooks';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import Username from 'ui/modules/account/about-me/Username';
import { useAuthGuard } from 'application/auth';

export default function LevelUpUsername() {
  useAuthGuard();
  const redirect = useQueryParam('redirect');
  const { push } = useHistory();
  const getMessage = useGetMessage();

  return (
    <div className="flex-grow flex flex-col justify-center lg:items-center">
      <Card className="flex-grow md:flex-grow-0 flex flex-col lg:w-2/3 xl:w-1/2">
        <Username
          title={getMessage(ids.account.aboutMe.username.title)}
          description={getMessage(ids.auth.levelUp.username.description)}
          submitText={getMessage(ids.auth.levelUp.submitText)}
          onSubmit={() => push(redirect)}
        />
      </Card>
    </div>
  );
}
