import React from 'react';
import { FaCookieBite, FaDiscord, FaTwitter } from 'react-icons/fa';
import { GAMES, NEW_LISTING } from 'ui/constants/paths';
import { LinkButton, AnchorButton } from 'ui/elements/Button';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';

// TODO: set up twitter / discord

export default function Footer() {
  const year = new Date().getFullYear();
  const g = useGetMessage();

  return (
    <footer className="border-t-2 border-gray-700 lg:bg-opacity-90 bg-black text-sm">
      <div className="p-4 md:px-12 lg:px-20 md:flex md:justify-between space-y-4 md:space-y-0">
        <div className="md:flex md:flex-col md:space-y-6">
          <AnchorButton to="/" className="font-logo">
            {g(ids.footer.title)}
          </AnchorButton>
          <div className="flex space-x-4 md:space-x-8 md:text-lg">
            <AnchorButton target="_blank" href="https://twitter.com">
              <FaTwitter />
            </AnchorButton>
            <AnchorButton target="_blank" href="https://discord.com">
              <FaDiscord />
            </AnchorButton>
            <FaCookieBite title="No cookies here!" />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <LinkButton to={GAMES}>{g(ids.footer.games)}</LinkButton>
          <LinkButton to={NEW_LISTING}>{g(ids.footer.list)}</LinkButton>
          <LinkButton to="/guide">{g(ids.footer.guide)}</LinkButton>
        </div>
        <div className="flex flex-col items-start">
          <LinkButton to="/terms">{g(ids.footer.terms)}</LinkButton>
          <LinkButton to="/privacy">{g(ids.footer.privacy)}</LinkButton>
          <LinkButton to="/credits">{g(ids.footer.credits)}</LinkButton>
        </div>
      </div>
      <div className="border-t border-gray-400 px-4 py-2 text-sm">
        {g(ids.footer.legal, { year })}
      </div>
    </footer>
  );
}
