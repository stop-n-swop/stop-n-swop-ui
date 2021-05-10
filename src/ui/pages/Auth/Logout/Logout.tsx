import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LOGIN } from 'ui/constants/paths';
import { useLogOut } from 'application/auth';

export default function Logout() {
  const { action: logOut } = useLogOut();
  const { push } = useHistory();

  useEffect(() => {
    (async () => {
      await logOut();
      push(LOGIN);
    })();
  }, [logOut, push]);

  return null;
}
