import { useHistory, useLocation } from 'react-router-dom';
import {
  makeLevelUpAddressPath,
  makeLevelUpUsernamePath,
  makeLoginPath,
} from 'ui/constants/paths';
import { Reason } from 'domain/constants/auth';
import { useUser } from 'application/user';
import { never } from 'crosscutting/utils';
import { hasAddress, hasUsername } from 'domain/selectors/user';
import { useIsLoggedIn } from './useIsLoggedIn';

export const useAuthGuard = ({
  username,
  address,
}: { username?: boolean; address?: boolean } = {}) => {
  const loggedIn = useIsLoggedIn();
  const { pathname, search } = useLocation();
  const { replace } = useHistory();
  const userQuery = useUser();

  if (!loggedIn) {
    replace(makeLoginPath({ reason: Reason.LOGIN_REQUIRED, pathname, search }));
    throw never();
  }
  if (username && !hasUsername(userQuery.data)) {
    replace(makeLevelUpUsernamePath({ pathname, search }));
    throw never();
  }
  if (address && !hasAddress(userQuery.data)) {
    replace(makeLevelUpAddressPath({ pathname, search }));
    throw never();
  }
};
