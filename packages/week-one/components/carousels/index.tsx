import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import camelCase from 'lodash.camelcase';

import type { carouselsFragment as carouselsFragmentType } from '../../gqls';
import { TYPES } from '../../utils/constants';

import Carousel from './Carousel';
import styles from './styles/index.module.scss';

type PropsType = Partial<carouselsFragmentType>;

const Carousels = (props: PropsType) => {
  const { t } = useTranslation('carousels');

  return (
    <div className={styles.root}>
      {TYPES.map(key => (
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
          data={
            props[camelCase(key) as Exclude<keyof PropsType, '__typename'>] ||
            null
          }
        />
      ))}
    </div>
  );
};

export default React.memo(Carousels);
