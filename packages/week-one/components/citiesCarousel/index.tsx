import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Carousel } from 'antd';

import { CITIES } from './constants';

const { Title } = Typography;

const CitiesCarousel = () => {
  const { t } = useTranslation('home');

  return (
    <>
      <Title level={2}>{t('maybe-go')}</Title>

      <Carousel>
        {CITIES.map(city => {
          <div key={city}>{t(city)}</div>;
        })}
      </Carousel>
    </>
  );
};

export default React.memo(CitiesCarousel);
