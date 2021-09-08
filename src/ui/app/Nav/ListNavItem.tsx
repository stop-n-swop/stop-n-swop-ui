import React from 'react';
import { FaListAlt } from 'react-icons/fa';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import { MY_LISTINGS, NEW_LISTING } from 'ui/constants/paths';
import NavItem from './NavItem';
import type { useMyListings } from 'application/listings';

interface Props {
  loggedIn: boolean;
  close(): void;
  myListingsQuery: ReturnType<typeof useMyListings>;
}

export default function ListNavItem({
  loggedIn,
  close,
  myListingsQuery,
}: Props) {
  const getMessage = useGetMessage();

  return (
    <Choose>
      <When condition={loggedIn && myListingsQuery.data.length}>
        <NavItem to={MY_LISTINGS} Icon={FaListAlt} onClose={close}>
          {getMessage(ids.nav.listings)}
        </NavItem>
      </When>
      <Otherwise>
        <NavItem Icon={FaListAlt} to={NEW_LISTING} onClose={close}>
          {getMessage(ids.nav.list)}
        </NavItem>
      </Otherwise>
    </Choose>
  );
}
