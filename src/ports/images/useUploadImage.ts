import { encase } from 'react-jpex';
import { useAction } from '@respite/action';
import type { UploadImage } from 'adapters/images/uploadImage';
import 'adapters/images/uploadImage';
import { isFileAnImage } from 'core/selectors/images';

export const useUploadImage = encase((upload: UploadImage) => () => {
  return useAction((file: File) => {
    if (!isFileAnImage(file)) {
      throw new Error('Wha?! This is not an image!');
    }
    return upload(file);
  });
});
