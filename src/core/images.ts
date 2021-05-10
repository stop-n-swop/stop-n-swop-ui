import type { ImageUrl } from 'domain/types';

export type ResizeImage = (file: File, maxSize: number) => Promise<File>;

export type UploadImage = (file: File) => Promise<ImageUrl>;
