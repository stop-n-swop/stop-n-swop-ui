import React from 'react';
import cx from 'classnames';
import Input from 'ui/elements/Input';

export default function Address() {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-lg font-bold">Address</h3>
      <p className="text-sm text-gray-100 italic">
        You'll need an address so we know where to send things. Setting an
        address will also improve your seller rating!
      </p>
      <div
        className={cx(
          'sm:w-1/2 sm:mx-auto space-y-4 flex-grow',
          'lg:flex lg:flex-col lg:justify-center',
        )}
      >
        <div>
          <Input id="line1" label="Line 1" value="" />
        </div>
        <div>
          <Input id="line2" label="Line 2" value="" />
        </div>
        <div>
          <Input id="city" label="Town / City" value="" />
        </div>
        <div>
          <Input id="postcode" label="Post code / Zip" value="" />
        </div>
        <div>
          <Input id="countryy" label="Country" value="" />
        </div>
      </div>
    </div>
  );
}
