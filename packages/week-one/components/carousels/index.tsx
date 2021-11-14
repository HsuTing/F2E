import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import Carousel from './Carousel';

const Carousels = () => {
  const { t } = useTranslation('carousels');

  return (
    <>
      <Carousel
        title={
          <>
            <Image src="/fire.svg" width={32} height={32} />

            {t('scenic-spots')}
          </>
        }
      />

      <Carousel
        title={
          <>
            <Image src="/company.svg" width={32} height={32} />

            {t('hotels')}
          </>
        }
      />

      <Carousel
        title={
          <>
            <Image src="/calendar.svg" width={32} height={32} />

            {t('activities')}
          </>
        }
      />
    </>
  );
};

export default React.memo(Carousels);
