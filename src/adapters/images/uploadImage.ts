import jpex from 'jpex';
import type { ResizeImage, UploadImage } from 'ports/images';
import './resizeImage';
import { fileToImageUrl } from './utils';

const uploadImage = (resizeImage: ResizeImage): UploadImage => async (
  givenFile,
) => {
  const file = await resizeImage(givenFile, 1000);
  await new Promise((res) => setTimeout(res, 3000));
  const url = await fileToImageUrl(file);
  return url;
};

jpex.factory<UploadImage>(uploadImage);
