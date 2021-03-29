import React, { forwardRef } from 'react';
import cx from 'classnames';
import Loader from 'react-spinners/BeatLoader';
import { FaCheck } from 'react-icons/fa';
import { Kind, ButtonComponent, Props, State } from './types';

const getColorClassNames = ({ state, kind }: { state: State; kind: Kind }) => {
  // @TODO: add error states for all kinds
  if (state === 'error') {
    return { 'bg-red-500': true, 'hover:bg-red-400': true, 'text-white': true };
  }
  if (kind === 'primary') {
    if (state === 'disabled') {
      return {
        'bg-green-400': true,
        'text-white': true,
        'bg-opacity-50': true,
        'text-opacity-50': true,
      };
    }
    return {
      'bg-green-500': true,
      'hover:bg-green-700': true,
      'text-white': true,
    };
  }
  if (kind === 'secondary') {
    if (state === 'disabled') {
      return { 'text-gray-300': true, 'border-gray-300': true, border: true };
    }
    return {
      'border-white': true,
      border: true,
      'hover:text-purple-300': true,
      'hover:border-purple-200': true,
    };
  }
  if (kind === 'tertiary') {
    if (state === 'disabled') {
      return { 'text-gray-300': true };
    }
    return { 'text-green-500': true, 'hover:text-green-300': true };
  }
  if (state === 'disabled') {
    return { 'text-300': true };
  }
  return { 'hover:text-green-200': true };
};

const getClassNames = ({
  state,
  padding,
}: {
  state: State;
  padding: boolean;
}) => {
  return {
    flex: true,
    'items-center': true,
    'justify-center': true,
    'px-4': padding,
    'py-3': padding,
    rounded: true,
    'font-medium': true,
    'md:transition-colors': true,
    'cursor-not-allowed':
      state === 'disabled' || state === 'pending' || state === 'success',
    relative: true,
  };
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
      className={cx(className, {
        ...getColorClassNames({ kind, state }),
        ...getClassNames({ state, padding }),
        ...styles,
      })}
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
            <Loader color="#FFFFFF" size={8} />
          </div>
        </When>
        <When condition={state === 'success'}>
          <div
            className={cx(
              'absolute inset-0 flex justify-center items-center',
              getColorClassNames({ kind, state }),
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

export default Button;
