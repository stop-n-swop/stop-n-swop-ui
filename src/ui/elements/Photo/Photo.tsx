import React, { ImgHTMLAttributes, useMemo } from 'react';
import { useResolve } from 'react-jpex';
import type { Config } from 'core/io';

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function Photo({ src: path, ...props }: Props) {
  const config = useResolve<Config>();

  const src = useMemo(() => {
    if (
      !path ||
      path.startsWith('https://') ||
      path.startsWith('http://') ||
      path.startsWith('/')
    ) {
      return path;
    }
    return `${config.images.url}/${path}`;
  }, [config.images.url, path]);

  return <img src={src} alt={path} loading="lazy" {...props} />;
}
