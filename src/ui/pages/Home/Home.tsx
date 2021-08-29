import React from 'react';
import { useIsLoggedIn } from 'application/auth';
import NewHome from './NewHome';
import ExistingHome from './ExistingHome';

export default function Home() {
  const isLoggedIn = useIsLoggedIn();

  if (isLoggedIn) {
    return <ExistingHome />;
  }
  return <NewHome />;
}
