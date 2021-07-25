import React, { ReactNode } from 'react';
import background from 'ui/assets/stars-bg.jpg';

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <div className="h-96 w-full relative border-white border-b-2">
      <div
        className="absolute bg-fixed inset-0 bg-cover bg-center filter"
        style={{
          backgroundImage: `url(${background})`,
          // @ts-ignore
          '--tw-brightness': 'brightness(.4)',
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 md:-translate-x-0 md:left-auto md:right-32 lg:left-1/2 top-1/2 transform -translate-y-1/2 px-4"
        style={{ width: 450 }}
      >
        <div className="relative flex flex-col space-y-4">{children}</div>
      </div>
    </div>
  );
}
