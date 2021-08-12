import React, { ReactNode } from 'react';
import ReactSelect from 'react-select';
import FieldError from '../FieldError';

interface Props {
  label: ReactNode;
  value: any;
  onChange?(value: any): void;
  options: Array<{
    label: ReactNode;
    value: any;
  }>;
  onSearch?(value: string): void;
  id: string;
  autoFocus?: boolean;
  error?: any;
  isLoading?: boolean;
}

export default function Typeahead({
  label,
  value,
  onChange,
  options,
  onSearch,
  id,
  autoFocus,
  error,
  isLoading,
}: Props) {
  return (
    <div>
      <If condition={label}>
        <label htmlFor={id} className="block text-gray-200 text-sm py-6">
          {label}
        </label>
      </If>
      <ReactSelect
        id="product_search"
        styles={{
          singleValue: (styles) => ({
            ...styles,
            color: '#FFF',
          }),
          control: (styles) => ({
            ...styles,
            backgroundColor: 'transparent',
            borderWidth: 0,
            borderBottomWidth: 1,
          }),
          menuList: (styles) => ({
            ...styles,
            backgroundColor: '#000',
          }),
          container: (styles) => ({
            ...styles,
            zIndex: 100,
          }),
          option: (styles, state) => ({
            ...styles,
            ...(state.isSelected
              ? { backgroundColor: 'rgb(16, 185, 129)' }
              : {}),
            ...(state.isFocused
              ? { backgroundColor: 'rgb(167, 139, 250)' }
              : {}),
          }),
          input: (styles) => ({
            ...styles,
            color: '#FFF',
          }),
        }}
        options={options}
        value={options.find((o) => o.value === value)}
        filterOption={() => true}
        onChange={(option) => onChange?.(option.value)}
        autoFocus={autoFocus}
        onInputChange={onSearch}
        inputId={id}
        isLoading={isLoading}
      />
      <If condition={Boolean(error)}>
        <FieldError error={error} />
      </If>
    </div>
  );
}
