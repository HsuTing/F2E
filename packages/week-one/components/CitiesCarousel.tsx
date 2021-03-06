import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import type { citiesCarouselQueryFragment as citiesCarouselQueryFragmentType } from '../gqls/types';
import { useCarouselInfo } from '../hooks/useCarouselInfo';
import { CITIES } from '../utils/constants';

import styles from './styles/citiesCarousel.module.scss';

interface PropsType {
  cities: citiesCarouselQueryFragmentType | null;
  recommends: typeof CITIES;
}

const { Title } = Typography;

const CitiesCarousel = ({ cities, recommends }: PropsType) => {
  const { t } = useTranslation('home');
  const { carouselRef, imageSize, isMobile } = useCarouselInfo(200);

  return (
    <>
      <Title className={styles.title} level={2}>
        {t('recommend')}
      </Title>

      <div ref={carouselRef} className={styles.root}>
        {!cities ? null : (
          <Carousel
            centerMode={isMobile}
            draggable={isMobile}
            dots={false}
            infinite
            variableWidth
          >
            {recommends.map(city => (
              <Link key={city} href={`/${city}`}>
                <a>
                  <div
                    className={styles.image}
                    style={{
                      width: imageSize,
                      height: imageSize,
                      background: `url(${
                        cities[city].pictures[0]?.url || ''
                      }) center / cover ${styles.imagePlaceholderBackground}`,
                    }}
                  >
                    {t(`common:cities.${city}`)}
                  </div>
                </a>
              </Link>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export default React.memo(CitiesCarousel);
