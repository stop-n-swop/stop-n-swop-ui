import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { HOME } from 'ui/constants/paths';
import { useLogOut } from 'usecases/auth';

export default function Logout() {
  const { action: logOut } = useLogOut();
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      await logOut();
      push(HOME);
    })();
  }, [logOut, push]);

  return null;
}
