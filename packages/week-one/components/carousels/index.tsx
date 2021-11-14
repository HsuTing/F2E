import React from 'react';
import { useTranslation } from 'next-i18next';

import Carousel from './Carousel';

const Carousels = () => {
  const { t } = useTranslation('carousels');

  return (
    <>
      <Carousel title={<>{t('scenic-spots')}</>} />

      <Carousel title={<>{t('hotels')}</>} />

      <Carousel title={<>{t('activities')}</>} />
    </>
  );
};

export default React.memo(Carousels);
