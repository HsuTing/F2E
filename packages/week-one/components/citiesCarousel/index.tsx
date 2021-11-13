import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import { useImageSize } from './hooks/useImageSize';
import styles from './styles/index.module.scss';
import { CITIES } from './constants';

const { Title } = Typography;

const CitiesCarousel = () => {
  const { t } = useTranslation('home');
  const { imagesRef, imageSize } = useImageSize();

  return (
    <>
      <Title level={2}>{t('maybe-go')}</Title>

      <div ref={imagesRef}>
        <Carousel dots={false} infinite variableWidth>
          {CITIES.map(city => (
            <div key={city}>
              <div
                className={styles.root}
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

export default React.memo(CitiesCarousel);
