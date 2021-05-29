import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaShoppingCart } from 'react-icons/fa';
import cx from 'classnames';
import Button from 'ui/elements/Button';
import { useMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { CHECKOUT } from 'ui/constants/paths';
import { useIsLoggedIn } from 'application/auth';
import { useBasket } from 'application/basket';
import Title from './Title';
import NavItems from './NavItems';

export default function Nav() {
  const loggedIn = useIsLoggedIn();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { data: basket } = useBasket();

  const basketCount = basket?.items.length ?? 0;

  return (
    <nav
      className="md:flex lg:px-4 border-b-2 border-primary font-title bg-black"
      style={{ fontSize: 12 }}
    >
      <div className="flex items-center pl-3 md:flex-grow">
        <Title />
        <div className="flex-grow" />
        <Button
          title={useMessage(ids.nav.basket)}
          component={Link}
          to={CHECKOUT}
          className="md:hidden relative"
        >
          <FaShoppingCart />
          <If condition={basketCount > 0}>
            <div className="bg-secondary rounded-full w-5 h-5 flex justify-center items-center text-xs absolute top-0 right-0">
              {basketCount}
            </div>
          </If>
        </Button>
        <Button
          title={useMessage(ids.nav.menu)}
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
        basketCount={basketCount}
      />
    </nav>
  );
}
