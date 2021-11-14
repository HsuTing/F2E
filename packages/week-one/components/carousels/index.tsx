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
            <span>
              <Image src="/fire.svg" width={32} height={32} />
            </span>

            {t('scenic-spots')}
          </>
        }
      />

      <Carousel
        title={
          <>
            <span>
              <Image src="/company.svg" width={32} height={32} />
            </span>

            {t('hotels')}
          </>
        }
      />

      <Carousel
        title={
          <>
            <span>
              <Image src="/calendar.svg" width={32} height={32} />
            </span>

            {t('activities')}
          </>
        }
      />
    </>
  );
};

export default React.memo(Carousels);
