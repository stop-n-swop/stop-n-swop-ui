import React, { forwardRef } from 'react';
import cx from 'classnames';
import Loader from 'ui/modules/Loader';
import { FaCheck } from 'react-icons/fa';
import type { Kind, ButtonComponent, Props, State } from './types';

const getColorClassNames = ({ state, kind }: { state: State; kind: Kind }) => {
  switch (kind) {
    case 'primary':
      switch (state) {
        case 'error':
          return 'bg-danger hover:bg-danger-dark text-white';
        case 'disabled':
          return 'bg-primary-lightest text-gray-200';
        default:
          return 'bg-primary hover:bg-primary-darker text-white hover:text-gray-100';
      }
    case 'secondary':
      switch (state) {
        case 'error':
          return 'bg-danger hover:bg-danger-dark text-white';
        case 'disabled':
          return 'bg-secondary-lightest text-gray-500';
        default:
          return 'bg-secondary hover:bg-secondary-darker text-white hover:text-gray-100';
      }
    case 'tertiary':
      switch (state) {
        case 'disabled':
          return 'text-gray-300';
        case 'error':
          return 'text-danger-light hover:text-danger-dark';
        case 'pending':
        case 'success':
          return 'text-transparent';
        default:
          return 'text-secondary-light hover:text-secondary-lightest';
      }
    default:
      switch (state) {
        case 'disabled':
          return 'text-gray-300';
        case 'error':
          return 'text-danger-light hover:text-danger-lighter';
        case 'pending':
        case 'success':
          return 'text-transparent';
        default:
          return 'hover:text-primary';
      }
  }
};

const getClassNames = ({
  state,
  padding,
}: {
  state: State;
  padding: boolean;
}) => {
  return cx(
    'flex items-center justify-center rounded font-medium md:transition-colors relative',
    padding && 'px-4 py-3',
    state === 'disabled' && 'cursor-not-allowed',
    (state === 'pending' || state === 'success') && 'cursor-wait',
    (state === 'none' || state === 'error') && 'cursor-pointer',
  );
};

const Button: ButtonComponent = forwardRef<HTMLButtonElement, Props>(
  (
    {
      component: Button = 'button',
      children,
      state = 'none',
      kind = 'none',
      className,
      styles,
      padding = true,
      onClick,
      ...props
    },
    ref,
  ) => (
    <Button
      ref={ref}
      type="button"
      className={cx(
        className,
        getColorClassNames({ kind, state }),
        getClassNames({ state, padding }),
        styles,
      )}
      disabled={
        state === 'disabled' || state === 'pending' || state === 'success'
      }
      onClick={(e) => {
        if (state === 'disabled' || state === 'pending' || props.disabled) {
          e.preventDefault(e);
          e.stopPropagation(e);
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      <Choose>
        <When condition={state === 'pending'}>
          <div
            className={cx(
              'absolute inset-0 flex justify-center items-center',
              getColorClassNames({ kind, state }),
            )}
          >
            <Loader sensible size={8} />
          </div>
        </When>
        <When condition={state === 'success'}>
          <div
            className={cx(
              'absolute inset-0 flex justify-center items-center',
              getColorClassNames({ kind, state: null }),
            )}
          >
            <FaCheck />
          </div>
        </When>
      </Choose>
      {children}
    </Button>
  ),
);
Button.displayName = 'Button';

export default Button;
