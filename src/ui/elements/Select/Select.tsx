import React, { ReactNode } from 'react';

interface Props {
  label: ReactNode;
  value: any;
  onChange?(value: any): void;
  options: Array<{ label: ReactNode; value: any }>;
  id: string;
}

export default function Select({ label, value, onChange, options, id }: Props) {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-200 text-sm">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full block bg-transparent border-b border-white focus:border-green-500"
      >
        {options.map(({ label, value }) => (
          <option value={value} className="bg-black text-white">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
