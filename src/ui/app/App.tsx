import React, { Suspense } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Intl } from 'ui/intl';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Respite } from '@respite/core';
import { en } from 'ui/messages';
import LoadingPage from 'ui/pages/Loading';
import { BreakpointProvider } from 'ui/breakpoints';
import { Breakpoints } from 'ui/constants/breakpoints';
import StuffNation from 'ui/pages/StuffNation';
import Core from './Core';
import Background from './Background';

export default function App() {
  if (
    process.env.NODE_ENV !== 'production' &&
    window.location.pathname === '/stuff/nation'
  ) {
    return <StuffNation />;
  }

  return (
    <Jpex>
      <Intl locale={navigator.language} messages={en} currency="GBP">
        <Respite>
          <BrowserRouter basename="/">
            <BreakpointProvider breakpoints={Breakpoints}>
              <div
                className="flex-grow flex flex-col"
                style={{ zIndex: 0, fontSize: 20 }}
              >
                <Background />
                <Suspense fallback={<LoadingPage />}>
                  <Core />
                </Suspense>
              </div>
            </BreakpointProvider>
          </BrowserRouter>
        </Respite>
      </Intl>
    </Jpex>
  );
}
