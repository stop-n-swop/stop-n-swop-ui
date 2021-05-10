import React, { useMemo } from 'react';
import { Status } from '@respite/action';
import type { ImageUrl } from 'domain/types';
import { useUploadImage } from 'application/images';
import Upload from './Upload';

export default function Connect({
  value,
  ...rest
}: {
  value: ImageUrl;
  error?: any;
  onChange(url: ImageUrl): void;
}) {
  const {
    action: upload,
    status: uploadStatus,
    error: uploadError,
  } = useUploadImage();
  const status = useMemo(() => {
    if (uploadStatus === Status.LOADING) {
      return 'uploading' as const;
    }
    if (value) {
      return 'preview' as const;
    }
    return 'empty' as const;
  }, [uploadStatus, value]);

  return (
    <Upload
      value={value}
      status={status}
      upload={upload}
      uploadError={uploadError}
      {...rest}
    />
  );
}
