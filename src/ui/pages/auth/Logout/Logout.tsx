import { useLogOut } from 'application/auth';
import { useEffect } from 'react';
import { useResolve } from 'react-jpex';
import { HOME } from 'ui/constants/paths';
import type { Navigate } from 'core/navigation';

export default function Logout() {
  const { action: logOut } = useLogOut();
  const navigate = useResolve<Navigate>();

  useEffect(() => {
    (async () => {
      await logOut();
      navigate(HOME);
    })();
  }, [logOut, navigate]);

  return null;
}
