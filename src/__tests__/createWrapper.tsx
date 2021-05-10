import React, { FunctionComponent, ReactNode, Suspense } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@respite/core';
import { Router, Route } from 'react-router-dom';
import type { JpexInstance } from 'jpex';
import { createMemoryHistory, History } from 'history';
import { Provider as Intl } from 'ui/intl';
import type { Driver, Storage } from 'core/io';

interface Props {
  inject?(jpex: JpexInstance): void;
  url?: string;
  path?: string;
  Render?: FunctionComponent<{ children: ReactNode }>;
  history?: History;
}

export default function createWrapper({
  inject = () => null,
  path,
  url = path || '/',
  Render = ({ children }) => <>{children}</>,
  history = createMemoryHistory({ initialEntries: [url] }),
}: Props = {}) {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <Jpex
        onMount={(jpex) => {
          // we want to mock some "edges" of our application by default
          // if you want to use the "real" version you'll have to manually re-register them
          jpex.constant<Console>({
            ...console,
            warn: () => null,
            error: () => null,
          });
          jpex.factory<Driver>(() => {
            throw new Error('please provide a dependency for Driver');
          });
          jpex.factory<Storage>(() => {
            throw new Error('please provide a dependency for Storage');
          });
          inject(jpex);
        }}
      >
        <Respite>
          <Intl locale="en">
            <Router history={history}>
              <Suspense fallback={null}>
                <Choose>
                  <When condition={Boolean(path)}>
                    <Route path={path} exact>
                      <Render>{children}</Render>
                    </Route>
                  </When>
                  <Otherwise>
                    <Render>{children}</Render>
                  </Otherwise>
                </Choose>
              </Suspense>
            </Router>
          </Intl>
        </Respite>
      </Jpex>
    );
  };

  return Wrapper;
}
