export function loadImage(image) {
  const isImageElement = (image instanceof HTMLImageElement || image instanceof Image);
  const instance = isImageElement ? image : new Image();

  return new Promise((resolve, reject) => {
    instance.onload = () => {
      instance.onload = instance.onerror = null;
      resolve(instance);
    };

    instance.onerror = (error) => {
      instance.onload = instance.onerror = null;
      reject(error);
    };

    if (!isImageElement) {
      instance.src = image;
    }

    if (instance.complete) {
      instance.onload = instance.onerror = null;
      resolve(instance);
    }
  });
}
