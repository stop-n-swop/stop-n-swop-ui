import { useHistory, useLocation } from 'react-router-dom';
import {
  makeLevelUpAddressPath,
  makeLevelUpUsernamePath,
  makeLoginPath,
} from 'ui/constants/paths';
import { Reason } from 'domain/constants/auth';
import { useUser } from 'usecases/user';
import { never } from 'crosscutting/utils';
import { useIsLoggedIn } from './useIsLoggedIn';

export const useAuthGuard = ({
  username,
  address,
}: { username?: boolean; address?: boolean } = {}) => {
  const loggedIn = useIsLoggedIn();
  const { pathname, search } = useLocation();
  const { push } = useHistory();
  const userQuery = useUser();

  if (!loggedIn) {
    push(makeLoginPath({ reason: Reason.LOGIN_REQUIRED, pathname, search }));
    throw never();
  }

  if (username && !userQuery.data.username) {
    push(makeLevelUpUsernamePath({ pathname, search }));
    throw never();
  }
  if (address && !userQuery.data.address.line1) {
    push(makeLevelUpAddressPath({ pathname, search }));
    throw never();
  }
};
