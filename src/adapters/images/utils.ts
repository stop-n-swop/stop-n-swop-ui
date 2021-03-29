export const resizeCanvas = async (
  originalCanvas: HTMLCanvasElement,
  maxSize: number,
): Promise<HTMLCanvasElement> => {
  let canvas = originalCanvas;
  while (canvas.width > maxSize) {
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = canvas.width / 2;
    tmpCanvas.height = canvas.height / 2;
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCtx.drawImage(canvas, 0, 0, tmpCanvas.width, tmpCanvas.height);
    canvas = tmpCanvas;
  }
  return canvas;
};

export const canvasToFile = (
  canvas: HTMLCanvasElement,
  originalFile: File,
): Promise<File> =>
  new Promise((res) => {
    canvas.toBlob((blob) => {
      const file = new File([blob], originalFile.name, {
        type: originalFile.type,
      });
      res(file);
    });
  });

export const imageToCanvas = async (
  image: HTMLImageElement,
): Promise<HTMLCanvasElement> => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas;
};

export const loadImageUrl = (url: string): Promise<HTMLImageElement> =>
  new Promise((res) => {
    const image = new Image();
    image.onload = () => res(image);
    image.src = url;
  });

export const fileToImageUrl = (file: File): Promise<string> =>
  new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      res(e.target.result as string);
    };
    reader.readAsDataURL(file);
  });
