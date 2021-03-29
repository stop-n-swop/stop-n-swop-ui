import jpex from 'jpex';
import { ImageUrl } from 'core/types';
import type { ResizeImage } from './resizeImage';
import './resizeImage';
import { fileToImageUrl } from './utils';

export type UploadImage = (file: File) => Promise<ImageUrl>;

const uploadImage = (resizeImage: ResizeImage): UploadImage => async (
  givenFile,
) => {
  const file = await resizeImage(givenFile, 1000);
  // TODO: do some real stuff here
  await new Promise((res) => setTimeout(res, 3000));
  const url = await fileToImageUrl(file);
  return url;
};

jpex.factory<UploadImage>(uploadImage);
