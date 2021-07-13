import { useHistory, useLocation } from 'react-router-dom';
import {
  makeLevelUpAddressPath,
  makeLeveLUpDetailsPath,
  makeLevelUpUsernamePath,
  makeLoginPath,
} from 'ui/constants/paths';
import { Reason } from 'domain/constants/auth';
import { useUser } from 'application/user';
import { never } from 'crosscutting/utils';
import { hasAddress, hasDetails, hasUsername } from 'domain/selectors/user';
import { useIsLoggedIn } from './useIsLoggedIn';

export const useAuthGuard = ({
  username,
  address,
  details,
}: { username?: boolean; address?: boolean; details?: boolean } = {}) => {
  const loggedIn = useIsLoggedIn();
  const { pathname, search } = useLocation();
  const { replace } = useHistory();
  const userQuery = useUser();

  if (!loggedIn) {
    replace(makeLoginPath({ reason: Reason.LOGIN_REQUIRED, pathname, search }));
    throw never();
  }
  if (details && !(hasDetails(userQuery.data) && hasUsername(userQuery.data))) {
    replace(makeLeveLUpDetailsPath({ pathname, search }));
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
