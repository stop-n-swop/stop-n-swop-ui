import jpex from 'jpex';
import type { ResizeImage, UploadImage } from 'core/images';
import type { AuthDriver } from 'core/io';
import './resizeImage';

const uploadImage = (
  resizeImage: ResizeImage,
  driver: AuthDriver,
): UploadImage => async (givenFile) => {
  const file = await resizeImage(givenFile, 640);

  const formData = new FormData();
  formData.append('image', file);

  const {
    data: { id },
  } = await driver<any, { id: string }>({
    url: '/images',
    method: 'POST',
    headers: { 'Content-Type': null },
    data: formData,
  });

  return id;
};

jpex.factory<UploadImage>(uploadImage);
