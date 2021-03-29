import jpex from 'jpex';
import {
  canvasToFile,
  fileToImageUrl,
  imageToCanvas,
  loadImageUrl,
  resizeCanvas,
} from './utils';

export type ResizeImage = (file: File, maxSize: number) => Promise<File>;

const resizeImage = async (file: File, maxSize: number): Promise<File> => {
  const imageUrl = await fileToImageUrl(file);
  const image = await loadImageUrl(imageUrl);
  if (image.width < maxSize && image.height < maxSize) {
    return file;
  }
  let canvas = await imageToCanvas(image);
  canvas = await resizeCanvas(canvas, maxSize);
  const newFile = await canvasToFile(canvas, file);
  return newFile;
};

jpex.factory<ResizeImage>(() => resizeImage);
