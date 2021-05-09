import React from 'react';
import type { ImageUrl } from 'domain/types';
import { BaseError, ValidationError } from '@sns/abyss';
import Empty from './Empty';
import Port from './Port';
import Preview from './Preview';
import Uploading from './Uploading';
import FieldError from '../FieldError';

export default function Upload({
  value,
  status,
  error,
  uploadError,
  onChange,
  upload,
}: {
  value: ImageUrl;
  status: 'preview' | 'uploading' | 'empty';
  error?: any;
  uploadError: any;
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

  const errorMessage = (() => {
    if (error != null) {
      return error;
    }
    if (uploadError == null) {
      return null;
    }
    if (uploadError instanceof ValidationError) {
      return Object.values(uploadError.errors)[0];
    }
    if (uploadError instanceof BaseError) {
      return uploadError.toString();
    }
    return uploadError.message;
  })();

  return (
    <>
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
      <If condition={Boolean(error || uploadError)}>
        <FieldError error={errorMessage} />
      </If>
    </>
  );
}
