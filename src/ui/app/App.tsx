import React, { Suspense } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Intl } from 'ui/intl';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Respite } from '@respite/core';
import { en } from 'ui/messages';
import background from 'ui/assets/bg-1.jpg';
import LoadingPage from 'ui/pages/Loading';
import { BreakpointProvider } from 'ui/breakpoints';
import { Breakpoints } from 'ui/constants/breakpoints';
import StuffNation from 'ui/pages/StuffNation';
import Core from './Core';

// TODO: get this
// https://www.dreamstime.com/taipei-taiwan-february-studio-shot-pile-different-nintendo-games-shot-above-large-pile-retro-nintendo-games-image113236003#_

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
                <div
                  style={{
                    backgroundImage: `url(${background})`,
                  }}
                  className="h-screen w-screen top-0 left-0 fixed bg-center pointer-events-none bg-cover filter grayscale md:blur-sm brightness-50"
                />
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
