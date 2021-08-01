import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useResolve } from 'react-jpex';
import { useLocation } from 'react-router-dom';
import ErrorPage from 'ui/pages/ErrorPage';
import LoadingPage from 'ui/pages/Loading';
import { useAuth } from 'application/auth';
import useExchanges from 'application/useExchanges';
import type { Navigate } from 'core/navigation';
import Content from './Content';
import Footer from './Footer';
import Nav from './Nav';
import Routes from './Routes';

export default function Core() {
  useExchanges();
  const { pathname } = useLocation();
  const window = useResolve<Window>();
  const navigate = useResolve<Navigate>();
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
        <ErrorBoundary
          FallbackComponent={ErrorPage}
          onReset={() => {
            navigate(window.location.href);
          }}
          resetKeys={[pathname]}
        >
          <Suspense fallback={<LoadingPage />}>
            <Routes />
          </Suspense>
        </ErrorBoundary>
      </Content>
      <Footer />
    </div>
  );
}
