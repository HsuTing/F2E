import { useEffect, useRef, useState } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

export const useImageWidth = () => {
  const wrapperRef = useRef(null);
  const [imageWidth, setImageWidth] = useState(0);

  useEffect(() => {
    const resize = () => {
      if (!wrapperRef.current) return;

      const { width } = getElementPosition(wrapperRef.current);
      const maxImages = Math.floor((width + 16) / (187 + 16));

      setImageWidth(width / maxImages);
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    wrapperRef,
    imageWidth,
  };
};
