import React from 'react';
import { ids, unflattenKeys } from 'ui/messages';
import {
  NavLink,
  Route,
  Switch,
  matchPath,
  useLocation,
} from 'react-router-dom';
import Card from 'ui/elements/Card';
import Intro from 'ui/help/guide-intro.mdx';
import { useMessage } from 'ui/intl';

const modules = Object.fromEntries(
  Object.entries(import.meta.globEager('../help/guide/**/*.mdx')).map(
    ([key, value]) => {
      return [
        key
          .replace('../help/guide/', '')
          .replace(/\d+-/g, '')
          .replace(/\.mdx$/, '')
          .replace(/\//g, '.'),
        value.default,
      ];
    },
  ),
);
const groupedModuleKeys: Record<string, Record<string, string>> =
  unflattenKeys(modules);

export default function Guide() {
  const location = useLocation();

  return (
    <div className="flex-grow flex flex-col">
      <Card
        title={
          <NavLink exact activeClassName="text-primary" to="/guide">
            {useMessage(ids.guide.title)}
          </NavLink>
        }
        className="flex-grow flex flex-col"
        innerClassName="flex-grow flex flex-col"
      >
        <div className="flex flex-col space-y-8 md:flex-row md:space-y-0 flex-grow">
          <ul className="px-8 space-y-4 flex-shrink-0 md:border-r md:mr-8">
            {Object.entries(groupedModuleKeys).map(([section, subSections]) => {
              const label = section.replace(/-/g, ' ');
              const path = `/guide/${subSections.index
                .replace(/\./g, '/')
                .replace('/index', '')}`;

              const match = matchPath(location.pathname, {
                path,
                exact: false,
              });

              return (
                <li key={section}>
                  <NavLink
                    activeClassName="text-primary"
                    className="capitalize text-lg font-semibold"
                    to={path}
                  >
                    {label}
                  </NavLink>

                  <If condition={match}>
                    <ul className="ml-3 space-y-2">
                      {Object.entries(subSections).map(([subSection, name]) => {
                        if (subSection === 'index') {
                          return null;
                        }
                        const label = subSection
                          .replace(/^\d*-/, '')
                          .replace(/-/g, ' ');
                        const path = `/guide/${name.replace(/\./g, '/')}`;
                        return (
                          <li>
                            <NavLink
                              activeClassName="text-primary"
                              className="capitalize text-sm font-light"
                              to={path}
                            >
                              {label}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </If>
                </li>
              );
            })}
          </ul>
          <div className="flex-grow">
            <Switch>
              <Route path="/guide" exact>
                <div className="help">
                  <Intro />
                </div>
              </Route>
              {Object.entries(modules).map(([key, Component]) => {
                const path = key.replace(/\./g, '/').replace('/index', '');

                return (
                  <Route path={`/guide/${path}`}>
                    <div className="help">
                      <Component />
                    </div>
                  </Route>
                );
              })}
            </Switch>
          </div>
        </div>
      </Card>
    </div>
  );
}
