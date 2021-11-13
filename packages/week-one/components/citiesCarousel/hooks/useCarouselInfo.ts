import { useEffect, useRef, useState } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

import styles from '../styles/index.module.scss';

const MIN_WIDTH = 187;

export const useCarouselInfo = () => {
  const carouselRef = useRef(null);
  const [carouselInfo, setCarouselInfo] = useState({
    imageSize: 0,
    draggable: false,
  });

  useEffect(() => {
    const resize = () => {
      if (!carouselRef.current) return;

      const { width } = getElementPosition(carouselRef.current);
      const amount = Math.floor((width + 16) / (MIN_WIDTH + 16));

      if (width > parseInt(styles.md.replace(/px/, ''), 10))
        setCarouselInfo({
          imageSize: (width - 16 * (amount - 1)) / amount + 1 / amount,
          draggable: false,
        });
      else
        setCarouselInfo({
          imageSize: MIN_WIDTH,
          draggable: true,
        });
    };

    resize();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return {
    ...carouselInfo,
    carouselRef,
  };
};
