import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Divider } from 'antd';

import type { carouselsFragment as carouselsFragmentType } from '../../gqls';

import Carousel from './Carousel';
import { carouselsFragment } from './gqls';
import styles from './styles/index.module.scss';

const Carousels = (_: Partial<carouselsFragmentType>) => {
  const { t } = useTranslation('carousels');

  return (
    <div className={styles.root}>
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

      <Divider />

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

      <Divider />

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
    </div>
  );
};

export { carouselsFragment };
export default React.memo(Carousels);
