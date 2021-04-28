import React, { Suspense } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Intl } from 'ui/intl';
import { BrowserRouter } from 'react-router-dom';
import { Provider as Respite } from '@respite/core';
import { en } from 'ui/messages';
import background from 'ui/assets/bg-1.jpg';
import LoadingPage from 'ui/pages/Loading';
import Core from './Core';

// TODO: get this
// https://www.dreamstime.com/taipei-taiwan-february-studio-shot-pile-different-nintendo-games-shot-above-large-pile-retro-nintendo-games-image113236003#_

export default function App() {
  return (
    <Jpex>
      <Intl locale={navigator.language} messages={en} currency="GBP">
        <Respite>
          <BrowserRouter basename="/">
            <div
              className="flex-grow flex flex-col text-white bg-gray-700 font-display"
              style={{ zIndex: 0, fontSize: 20 }}
            >
              <div
                style={{
                  backgroundImage: `url(${background})`,
                }}
                className="h-screen w-screen top-0 left-0 absolute md:fixed bg-center pointer-events-none bg-cover filter grayscale blur-sm brightness-50"
              />
              <Suspense fallback={<LoadingPage />}>
                <Core />
              </Suspense>
            </div>
          </BrowserRouter>
        </Respite>
      </Intl>
    </Jpex>
  );
}
