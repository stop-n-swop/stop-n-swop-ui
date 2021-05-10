import { encase } from 'react-jpex';
import { useAction } from '@respite/action';
import { isFileAnImage } from 'domain/selectors/images';
import type { UploadImage } from 'core/images';

export const useUploadImage = encase((upload: UploadImage) => () => {
  return useAction((file: File) => {
    if (!isFileAnImage(file)) {
      throw new Error('Wha?! This is not an image!');
    }
    return upload(file);
  }, []);
});
