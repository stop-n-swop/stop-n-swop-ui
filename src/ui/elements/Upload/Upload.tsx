import React from 'react';
import { ImageUrl } from 'core/types';
import Empty from './Empty';
import Port from './Port';
import Preview from './Preview';
import Uploading from './Uploading';

export default function Upload({
  value,
  status,
  onChange,
  upload,
}: {
  value: ImageUrl;
  status: 'preview' | 'uploading' | 'empty';
  onChange(value: ImageUrl): void;
  upload(file: File): Promise<string>;
}) {
  const handleClear = () => {
    onChange(null);
  };
  const handleUpload = async (files: FileList) => {
    const value = await upload(files[0]);
    onChange(value);
  };

  return (
    <Port>
      <Choose>
        <When condition={status === 'preview'}>
          <Preview onClear={handleClear} preview={value} />
        </When>
        <When condition={status === 'uploading'}>
          <Uploading />
        </When>
        <Otherwise>
          <Empty onFileSelect={handleUpload} />
        </Otherwise>
      </Choose>
    </Port>
  );
}
