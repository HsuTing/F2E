import { useEffect, useRef, useState } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

export const useImageSize = () => {
  const imagesRef = useRef(null);
  const [imageSize, setImageSize] = useState(0);

  useEffect(() => {
    const resize = () => {
      if (!imagesRef.current) return;

      const { width } = getElementPosition(imagesRef.current);
      const amount = Math.floor((width + 16) / (187 + 16));

      setImageSize((width - 16 * (amount - 1)) / amount + 1 / amount);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    imagesRef,
    imageSize,
  };
};
