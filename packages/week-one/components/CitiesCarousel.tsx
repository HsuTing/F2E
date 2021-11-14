import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import { citiesCarouselQueryFragment as citiesCarouselQueryFragmentType } from '../gqls';
import { CITIES } from '../utils/constants';

import { citiesCarouselQueryFragment } from './gqls/citiesCarousel';
import { useCarouselInfo } from './hooks/useCarouselInfo';
import styles from './styles/citiesCarousel.module.scss';

interface PropsType {
  cities: citiesCarouselQueryFragmentType | null;
  recommends: typeof CITIES;
}

const { Title } = Typography;

const CitiesCarousel = ({ cities, recommends }: PropsType) => {
  const { t } = useTranslation('home');
  const { carouselRef, imageSize, ...carouselInfo } = useCarouselInfo();

  return (
    <>
      <Title className={styles.title} level={2}>
        {t('recommend')}
      </Title>

      <div ref={carouselRef} className={styles.root}>
        {!cities ? null : (
          <Carousel {...carouselInfo} dots={false} infinite variableWidth>
            {recommends.map(city => (
              <div key={city}>
                <div
                  className={styles.image}
                  style={{
                    width: imageSize,
                    height: imageSize,
                    background: `url(${cities[city].picture.url}) center / cover ${styles.imagePlaceholderBackground}`,
                  }}
                >
                  {t(`cities.${city}`)}
                </div>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
};

export { citiesCarouselQueryFragment };
export default React.memo(CitiesCarousel);
