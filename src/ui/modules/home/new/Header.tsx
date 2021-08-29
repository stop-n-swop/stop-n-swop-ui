import React from 'react';
import Logo from 'ui/app/Nav/Logo';

export default function Header() {
  return (
    <div className="py-6 flex justify-center items-center text-3xl bg-black border-primary-darkest border-b-2">
      <Logo />
    </div>
  );
}
