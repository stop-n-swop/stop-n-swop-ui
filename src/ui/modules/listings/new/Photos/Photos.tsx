import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useGetMessage } from 'ui/intl';
import Upload from 'ui/elements/Upload';
import { ids } from 'ui/messages';
import Buttons from '../Buttons';

const Row = ({
  errors,
  index,
  label,
}: {
  errors: any;
  index: number;
  label: string;
}) => {
  const name = `images[${index}]`;
  const error = errors.images?.[index];
  const getMessage = useGetMessage();

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 sm:px-3 pb-3">
      <h2 className="flex-grow">{label}</h2>
      <Controller
        name={name}
        rules={{
          required: index === 0 && getMessage(ids.listings.new.photos.required),
        }}
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <Upload value={value} onChange={onChange} error={error} />
        )}
      />
    </div>
  );
};

export default function PhotosStep({ previous }: { previous(): void }) {
  const {
    formState: { errors },
  } = useFormContext();
  const labels = ['Main photo', 'Cartridge (front)', 'Cartridge (back)'];
  const getMessage = useGetMessage();

  return (
    <div>
      <h3 className="text-lg">{getMessage(ids.listings.new.photos.title)}</h3>
      <div className="italic text-gray-200 text-sm mb-6">
        {getMessage(ids.listings.new.photos.description)}
      </div>
      <div className="flex flex-wrap">
        {labels.map((label, i) => (
          <Row errors={errors} index={i} label={label} key={label} />
        ))}
      </div>
      <Buttons previous={previous} />
    </div>
  );
}
