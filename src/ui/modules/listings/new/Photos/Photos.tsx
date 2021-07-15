import React from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import Upload from 'ui/elements/Upload';
import { ids } from 'ui/messages';
import useIsMounted from 'ui/hooks/useIsMounted';
import Buttons from '../Buttons';
import type { Values } from '../types';

const boxKeys = ['box-front', 'box-back'];
const instructionKeys = ['instructions'];

const Row = ({
  imageKey,
  required,
}: {
  imageKey: string;
  required: boolean;
}) => {
  const getMessage = useGetMessage();
  const isMounted = useIsMounted();
  const label = getMessage(
    ids.listings.new.photos[imageKey] ?? ids.listings.new.photos.unknown,
  );
  const name = `images.${imageKey}`;

  return (
    <div className="w-full px-12 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:px-3 pb-3">
      <p className="italic text-sm">{label}</p>
      <Controller
        name={name}
        rules={{
          validate: {
            required: (value) => {
              return (
                !isMounted() ||
                !required ||
                Boolean(value) ||
                getMessage(ids.listings.new.photos.required)
              );
            },
          },
        }}
        defaultValue=""
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Upload value={value} onChange={onChange} error={error} />
        )}
      />
    </div>
  );
};

export default function PhotosStep({
  previous,
  requiredPhotos,
}: {
  previous(): void;
  requiredPhotos: Array<{ key: string; required: boolean }>;
}) {
  const getMessage = useGetMessage();
  const boxed = Boolean(useWatch<Values>({ name: 'boxed' }));
  const instructions = Boolean(useWatch<Values>({ name: 'instructions' }));

  const photos = requiredPhotos.filter(({ key, required }) => {
    if (required) {
      return true;
    }
    if (boxKeys.includes(key)) {
      return boxed;
    }
    if (instructionKeys.includes(key)) {
      return instructions;
    }
    return true;
  });

  return (
    <div>
      <h3 className="text-lg">{getMessage(ids.listings.new.photos.title)}</h3>
      <div className="italic text-gray-200 text-sm mb-6">
        {getMessage(ids.listings.new.photos.description)}
      </div>
      <div className="flex flex-wrap">
        {photos.map(({ key, required }) => (
          <Row key={key} imageKey={key} required={required} />
        ))}
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
