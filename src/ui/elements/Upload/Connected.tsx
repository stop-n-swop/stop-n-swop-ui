import React, { useMemo } from 'react';
import { Status } from '@respite/action';
import { ImageUrl } from 'core/types';
import { useUploadImage } from 'ports/images';
import Upload from './Upload';

export default function Connect({
  value,
  ...rest
}: {
  value: ImageUrl;
  onChange(url: ImageUrl): void;
}) {
  const { action: upload, status: uploadStatus } = useUploadImage();
  const status = useMemo(() => {
    if (uploadStatus === Status.LOADING) {
      return 'uploading' as const;
    }
    if (value) {
      return 'preview' as const;
    }
    return 'empty' as const;
  }, [uploadStatus, value]);

  return <Upload value={value} status={status} upload={upload} {...rest} />;
}
