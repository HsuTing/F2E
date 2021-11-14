import { useEffect, useRef, useState } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

import styles from '../styles/constants.module.scss';

export const useCarouselInfo = (minWidth: number) => {
  const carouselRef = useRef(null);
  const [carouselInfo, setCarouselInfo] = useState({
    imageSize: 0,
    isMobile: false,
  });

  useEffect(() => {
    const resize = () => {
      if (!carouselRef.current) return;

      const { width } = getElementPosition(carouselRef.current);
      const amount = Math.floor((width + 16) / (minWidth + 16));

      if (window.innerWidth > parseInt(styles.md.replace(/px/, ''), 10))
        setCarouselInfo({
          imageSize: (width - 16 * (amount - 1)) / amount + 1 / amount,
          isMobile: false,
        });
      else
        setCarouselInfo({
          imageSize: minWidth,
          isMobile: true,
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
