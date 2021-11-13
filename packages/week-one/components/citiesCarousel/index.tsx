import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import { citiesCarouselQueryFragment } from './gqls/citiesCarousel';
import { useCarouselInfo } from './hooks/useCarouselInfo';
import styles from './styles/index.module.scss';
import { CITIES } from './constants';

const { Title } = Typography;

const CitiesCarousel = () => {
  const { t } = useTranslation('home');
  const { carouselRef, imageSize, ...carouselInfo } = useCarouselInfo();

  return (
    <>
      <Title className={styles.title} level={2}>
        {t('recommend')}
      </Title>

      <div ref={carouselRef} className={styles.root}>
        <Carousel {...carouselInfo} dots={false} infinite variableWidth>
          {CITIES.map(city => (
            <div key={city}>
              <div
                className={styles.image}
                style={{
                  width: imageSize,
                  height: imageSize,
                }}
              >
                {t(`cities.${city}`)}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export { citiesCarouselQueryFragment };
export default React.memo(CitiesCarousel);
