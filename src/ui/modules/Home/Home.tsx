import React from 'react';
import background from 'ui/assets/bg-1.jpg';
import Button from 'ui/elements/Button';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import cx from 'classnames';
import { ids } from 'ui/messages';
import Card from 'ui/elements/Card';
import { PRODUCTS, NEW_LISTING } from 'ui/constants/paths';

export default function Home() {
  return (
    <div className="flex-grow flex flex-col relative overflow-y-hidden">
      <div
        style={{
          backgroundImage: `url(${background})`,
          filter: 'blur(3px)',
          zIndex: 0,
          top: -45,
        }}
        className="h-screen w-screen left-0 absolute bg-center pointer-events-none bg-cover"
      />
      <div
        className={cx(
          'relative',
          'flex-grow flex flex-col',
          'md:max-w-3/4 md:justify-center md:mx-auto',
          'lg:max-w-1/2',
          'xl:justify-end xl:mx-0',
        )}
      >
        <Card
          className={cx(
            'flex-grow space-y-12',
            'md:flex-grow-0',
            'xl:mb-40 xl:ml-40',
          )}
        >
          <h1 className="text-2xl">
            <FormattedMessage id={ids.home.title} />
          </h1>
          <p>
            <FormattedMessage id={ids.home.text} />
          </p>
          <div
            className={cx(
              'pt-12 text-lg space-x-6 flex justify-center',
              'sm:pt-4',
              'lg:justify-start',
              'xl:pt-0',
            )}
          >
            <Button component={Link} kind="primary" to={PRODUCTS}>
              <span>
                <FormattedMessage id={ids.home.browse} />
              </span>
            </Button>
            <Button component={Link} kind="secondary" to={NEW_LISTING}>
              <span>
                <FormattedMessage id={ids.home.list} />
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
