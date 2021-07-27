import React from 'react';
import { useGetMessage } from 'ui/intl';
import { ids } from 'ui/messages';
import cx from 'classnames';
import { FaCcMastercard, FaCcVisa, FaCreditCard } from 'react-icons/fa';
import type { Card as ICard } from '@sns/contracts/payment';

export default function Card({
  card,
  cardId,
  onClick,
}: {
  card: ICard;
  cardId: string;
  onClick(id: string): void;
}) {
  const selected = cardId === card.id;
  const g = useGetMessage();

  const Icon = (() => {
    switch (card.provider) {
      case 'CB':
      case 'VISA':
        return FaCcVisa;
      case 'MASTERCARD':
        return FaCcMastercard;
      default:
        return FaCreditCard;
    }
  })();

  return (
    <button
      type="button"
      className={cx(
        'flex justify-between items-center',
        'first:rounded-t-lg shadow-inner w-full space-x-4 py-4 px-8',
        selected
          ? 'bg-secondary-light text-white'
          : 'bg-white text-black hover:bg-gray-400 hover:text-gray-100',
      )}
      onClick={() => onClick(card.id)}
    >
      <span>
        <Icon size="2em" />
      </span>
      <span className="italic">
        {g(ids.checkout.payment.card.number, { alias: card.alias })}
      </span>
      <span className="text-right text-xs italic">{card.expires}</span>
    </button>
  );
}
