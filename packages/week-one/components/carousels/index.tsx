import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { filter } from 'graphql-anywhere';
import { Divider } from 'antd';

import type { carouselsFragment as carouselsFragmentType } from '../../gqls';

import Carousel from './Carousel';
import { carouselFragment } from './gqls/carousel';
import styles from './styles/index.module.scss';

const Carousels = ({
  scenicSpots,
  hotels,
  activities,
}: Partial<carouselsFragmentType>) => {
  const { t } = useTranslation('carousels');

  return (
    <div className={styles.root}>
      {!scenicSpots ? null : (
        <Carousel
          title={
            <>
              <span>
                <Image src="/fire.svg" width={32} height={32} />
              </span>

              {t('scenic-spots')}
            </>
          }
          data={filter(carouselFragment, scenicSpots)}
        />
      )}

      <Divider />

      {!hotels ? null : (
        <Carousel
          title={
            <>
              <span>
                <Image src="/company.svg" width={32} height={32} />
              </span>

              {t('hotels')}
            </>
          }
          data={filter(carouselFragment, hotels)}
        />
      )}

      <Divider />

      {!activities ? null : (
        <Carousel
          title={
            <>
              <span>
                <Image src="/calendar.svg" width={32} height={32} />
              </span>

              {t('activities')}
            </>
          }
          data={filter(carouselFragment, activities)}
        />
      )}
    </div>
  );
};

export default React.memo(Carousels);
