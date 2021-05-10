import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useResolve } from 'react-jpex';
import { useLocation } from 'react-router-dom';
import ErrorPage from 'ui/pages/Error';
import LoadingPage from 'ui/pages/Loading';
import Pages from 'ui/pages/Pages';
import { useAuth } from 'application/auth';
import useExchanges from 'application/useExchanges';
import Content from './Content';
import Footer from './Footer';
import Nav from './Nav';

export default function Core() {
  useExchanges();
  const { pathname } = useLocation();
  const window = useResolve<Window>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, window]);
  const ready = useAuth();

  if (!ready) {
    return <LoadingPage />;
  }

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
