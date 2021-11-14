import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

import type { carouselsFragment as carouselsFragmentType } from '../../gqls';

import Carousel from './Carousel';
import styles from './styles/index.module.scss';

const Carousels = ({
  scenicSpots,
  hotels,
  activities,
}: Partial<carouselsFragmentType>) => {
  const { t } = useTranslation('carousels');

  return (
    <div className={styles.root}>
      {[
        {
          key: 'scenic-spots',
          data: scenicSpots,
        },
        {
          key: 'hotels',
          data: hotels,
        },
        {
          key: 'activities',
          data: activities,
        },
      ].map(({ key, data }) =>
        !data ? null : (
          <Carousel
            key={key}
            title={
              <>
                <span>
                  <Image src={`/${key}.svg`} width={32} height={32} />
                </span>

                {t(key)}
              </>
            }
            data={data}
          />
        ),
      )}
    </div>
  );
};

export default React.memo(Carousels);
