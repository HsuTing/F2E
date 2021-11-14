import { useEffect, useRef, useState } from 'react';
import getElementPosition from 'fbjs/lib/getElementPosition';

import styles from '../styles/constants.module.scss';

const PADDING = parseInt(styles.carouselPadding.replace(/px/, ''), 10);

export const useCarouselInfo = (
  minWidth: number,
  mobileWidth: number | '100%' = minWidth,
) => {
  const carouselRef = useRef(null);
  const [carouselInfo, setCarouselInfo] = useState({
    imageSize: 0,
    isMobile: false,
  });

  useEffect(() => {
    const resize = () => {
      if (!carouselRef.current) return;

      const { width } = getElementPosition(carouselRef.current);
      const amount = Math.floor((width + PADDING) / (minWidth + PADDING));

      if (window.innerWidth > parseInt(styles.md.replace(/px/, ''), 10))
        setCarouselInfo({
          imageSize: (width - PADDING * (amount - 1)) / amount + 1 / amount,
          isMobile: false,
        });
      else
        setCarouselInfo({
          imageSize: mobileWidth !== '100%' ? mobileWidth : width,
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
