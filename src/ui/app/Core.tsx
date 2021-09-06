import React, { Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useResolve } from 'react-jpex';
import { useLocation, useHistory } from 'react-router-dom';
import ErrorPage from 'ui/pages/ErrorPage';
import LoadingPage from 'ui/pages/Loading';
import { useAuth } from 'application/auth';
import useExchanges from 'application/useExchanges';
import type { Navigate } from 'core/navigation';
import Content from './Content';
import Footer from './Footer';
import Nav from './Nav';
import Routes from './Routes';

const sequence = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const useContra = () => {
  const { push } = useHistory();
  const window = useResolve<Window>();

  useEffect(() => {
    let remaining = [...sequence];

    window.addEventListener('keydown', (e) => {
      if (remaining[0] === e.key) {
        remaining.shift();
        if (remaining.length === 0) {
          window.contra = true;
          push('/stuff/nation');
        }
      } else if (remaining.length !== sequence.length) {
        remaining = [...sequence];
      }
    });
  }, [push, window]);
};

const useScrolling = () => {
  const { pathname, hash } = useLocation();
  const window = useResolve<Window>();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, window]);
  useEffect(() => {
    if (hash) {
      const handle = setInterval(() => {
        const el = document.querySelector(hash);
        if (el) {
          clearInterval(handle);
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }, 100);
      return () => clearInterval(handle);
    }
    return null;
  }, [hash]);
};

export default function Core() {
  useExchanges();
  useScrolling();
  useContra();
  const { pathname } = useLocation();
  const window = useResolve<Window>();
  const navigate = useResolve<Navigate>();
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
