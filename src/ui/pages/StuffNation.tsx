/* eslint-disable react/jsx-no-literals */
import React from 'react';
import knitting from 'ui/assets/stuff-nation/knitting.jpeg';
import mug from 'ui/assets/stuff-nation/mug.jpeg';
import party from 'ui/assets/stuff-nation/party.jpg';
import phone from 'ui/assets/stuff-nation/phone.jpeg';

const products = [
  {
    src: knitting,
    name: 'Mario knitting set',
    price: '£50.00',
  },
  {
    src: mug,
    name: 'Nintendo 64 mug',
    price: '£4.99',
  },
  {
    src: phone,
    name: 'Super mario phone!',
    price: '£100.00',
  },
  {
    src: party,
    name: 'Mario party',
    price: '£1.00 + £99.00 shipping',
  },
];

export default function StuffNation() {
  return (
    <div className="min-h-screen w-screen bg-blue-100 text-gray-700 space-y-4">
      <div className="w-full text-blue-600 text-3xl text-center">
        Stuff Nation
      </div>
      <div className="flex items-center">
        <div className="w-3/4">
          <input
            className="border-gray-400 border-r-0 border rounded-l-lg px-4 py-1 w-full"
            value="mario 64"
          />
        </div>
        <div className="w-1/4">
          <button
            type="button"
            className="block w-full py-1 border border-l-0 border-blue-400 bg-blue-400 rounded-r-lg text-white"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex space-x-12">
        <div className="text-sm space-y-4 flex-shrink-0">
          <div>{'Platforms >'}</div>
          <div>{'Regions >'}</div>
          <div>{'Features >'}</div>
          <div>{'Rating >'}</div>
          <div>{'Condition >'}</div>
          <div>{'Price >'}</div>
        </div>
        <div className="flex-grow">
          <div>
            99,521 results for <strong>mario 64</strong>
          </div>
          <ul className="space-y-3">
            {products.map((product) => (
              <li className="flex w-full items-center space-x-3">
                <div className="w-1/4 aspect aspect-16-9">
                  <img
                    alt="preview"
                    src={product.src}
                    className="object-cover"
                  />
                </div>
                <span className="flex-grow">{product.name}</span>
                <div className="px-4 text-right">
                  <div className="font-semibold flex-shrink-0">
                    {product.price}
                  </div>
                  <button
                    type="button"
                    className="bg-blue-400 px-3 py-2 text-white"
                  >
                    Buy it
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
