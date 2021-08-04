import React, { ComponentType, InputHTMLAttributes, ReactNode } from 'react';
import cx from 'classnames';
import './input.css';
import { isNumeric } from 'crosscutting/utils';
import FieldError from '../FieldError';

type State = 'success' | 'error' | 'disabled' | 'none';

export interface Props
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  id: string;
  label?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  containerStyles?: Record<string, boolean>;
  containerClassName?: string;
  styles?: Record<string, boolean>;
  labelStyles?: Record<string, boolean>;
  labelClassName?: string;
  state?: State;
  error?: any;
  hasError?: boolean;
  Component?: string | ComponentType<any>;
  options?: any;
}

export default function Input({
  prefix,
  suffix,
  containerStyles,
  containerClassName,
  className,
  styles,
  labelStyles,
  labelClassName,
  label,
  id,
  error,
  hasError = !!error,
  disabled,
  // eslint-disable-next-line no-nested-ternary
  state = hasError ? 'error' : disabled ? 'disabled' : 'none',
  onChange,
  children,
  Component = 'input',
  ...props
}: Props) {
  return (
    <>
      <div
        className={cx(
          'flex items-end border-b flex-grow',
          {
            'focus-within:border-primary': state === 'none',
            'border-danger focus-within:border-danger-light': state === 'error',
            'border-gray-400': state === 'disabled',
          },
          containerStyles,
          containerClassName,
        )}
      >
        {prefix}
        <div className="flex-grow relative mt-6">
          <Component
            id={id}
            className={cx(
              'input',
              'bg-transparent outline-none w-full',
              'disabled:text-gray-300',
              styles,
              className,
            )}
            disabled={disabled}
            onChange={(e) => {
              if (
                Component === 'input' &&
                props.inputMode === 'numeric' &&
                e.target.value &&
                !isNumeric(e.target.value)
              ) {
                return;
              }
              onChange?.(e);
            }}
            {...props}
          />
          <If condition={label}>
            <label
              htmlFor={id}
              className={cx(
                'absolute left-0 top-0 text-sm transition-all text-gray-200',
                labelStyles,
                labelClassName,
              )}
            >
              {label}
            </label>
          </If>
          {children}
        </div>
        {suffix}
      </div>
      <If condition={error}>
        <FieldError error={error} />
      </If>
    </>
  );
}
