import React, { Suspense } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { en } from 'ui/messages';
import background from 'ui/assets/bg-1.jpg';
import ErrorPage from 'ui/pages/Error';
import LoadingPage from 'ui/pages/Loading';
import Pages from 'ui/pages/Pages';
import Content from './Content';
import Footer from './Footer';
import Nav from './Nav';

// TODO: get this
// https://www.dreamstime.com/taipei-taiwan-february-studio-shot-pile-different-nintendo-games-shot-above-large-pile-retro-nintendo-games-image113236003#_

export default function App() {
  return (
    <>
      <Jpex>
        <IntlProvider locale={navigator.language} messages={en}>
          <BrowserRouter basename="/">
            <div
              className="flex-grow flex flex-col text-white bg-gray-700 font-display z-0"
              style={{ zIndex: 0, fontSize: 20 }}
            >
              <div
                style={{
                  backgroundImage: `url(${background})`,
                  filter: 'grayscale(1) blur(2px) brightness(0.5)',
                }}
                className="h-screen w-screen top-0 left-0 absolute md:fixed bg-center pointer-events-none bg-cover"
              />
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
            </div>
          </BrowserRouter>
        </IntlProvider>
      </Jpex>
    </>
  );
}
