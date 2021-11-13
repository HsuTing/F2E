import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import { CITIES } from './constants';
import { useImageWidth } from './hooks/useImageWidth';

const { Title } = Typography;

const CitiesCarousel = () => {
  const { t } = useTranslation('home');
  const { wrapperRef, imageWidth } = useImageWidth();

  return (
    <>
      <Title level={2}>{t('maybe-go')}</Title>

      <div ref={wrapperRef}>
        <Carousel variableWidth>
          {CITIES.map(city => (
            <div key={city}>
              <div
                style={{
                  width: imageWidth,
                  height: imageWidth,
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
