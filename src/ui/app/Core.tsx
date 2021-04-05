import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useResolve } from 'react-jpex';
import { useLocation } from 'react-router-dom';
import ErrorPage from 'ui/pages/Error';
import LoadingPage from 'ui/pages/Loading';
import Pages from 'ui/pages/Pages';
import Content from './Content';
import Footer from './Footer';
import Nav from './Nav';

// TODO: get this
// https://www.dreamstime.com/taipei-taiwan-february-studio-shot-pile-different-nintendo-games-shot-above-large-pile-retro-nintendo-games-image113236003#_

export default function Core() {
  const { pathname } = useLocation();
  const window = useResolve<Window>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, window]);

  return (
    <div className="relative flex-grow flex flex-col">
      <Nav />
      <Content>
        <ErrorBoundary FallbackComponent={ErrorPage}>
          <Suspense fallback={<LoadingPage />}>
            <Pages />
          </Suspense>
        </ErrorBoundary>
      </Content>
      <Footer />
    </div>
  );
}
