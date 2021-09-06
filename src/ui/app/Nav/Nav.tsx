import React, { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import cx from 'classnames';
import Button from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { useIsLoggedIn } from 'application/auth';
import { useMyListings } from 'application/listings';
import { useMyOrders } from 'application/orders';
import { useLocation } from 'react-router-dom';
import { HOME } from 'ui/constants/paths';
import Title from './Title';
import NavItems from './NavItems';
import Notices from './Notices';

export default function Nav() {
  const loggedIn = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const myListingsQuery = useMyListings();
  const myOrdersQuery = useMyOrders();
  const location = useLocation();
  const g = useGetMessage();

  if (location.pathname === HOME && !loggedIn) {
    return null;
  }
  if (location.pathname === '/stuff/nation') {
    return null;
  }

  return (
    <nav className="md:flex pl-4 lg:px-4 border-b-2 border-primary bg-black">
      <div className="flex items-center md:flex-grow">
        <Title />
        <div className="flex-grow" />
        <If condition={loggedIn}>
          <ul className="md:hidden relative">
            <Notices />
          </ul>
        </If>
        <Button
          title={g(ids.nav.menu)}
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          <FaChevronDown
            className={cx(
              'transition-transform transform',
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </Button>
      </div>
      <NavItems
        loggedIn={loggedIn}
        open={open}
        close={close}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
        myListingsQuery={myListingsQuery}
        myOrdersQuery={myOrdersQuery}
      />
    </nav>
  );
}
