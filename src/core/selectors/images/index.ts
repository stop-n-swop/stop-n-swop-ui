export const isFileAnImage = (file: File) => {
  return file.type.startsWith('image/');
};
