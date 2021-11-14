import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Button, Carousel as AntdCarousel } from 'antd';

import type { carouselsFragment as carouselsFragmentType } from '../../gqls';
import { useCarouselInfo } from '../../hooks/useCarouselInfo';

import styles from './styles/carousel.module.scss';

interface PropsType {
  title: React.ReactElement;
  data:
    | carouselsFragmentType['scenicSpots']
    | carouselsFragmentType['hotels']
    | carouselsFragmentType['activities'];
}

const { Title } = Typography;

const Carousel = ({ title, data }: PropsType) => {
  const { t } = useTranslation('carousels');
  const { carouselRef, imageSize } = useCarouselInfo(350, '100%');

  return (
    <>
      <Title className={styles.title} level={2}>
        {title}
      </Title>

      <div ref={carouselRef}>
        <AntdCarousel infinite variableWidth>
          {data.map(({ id }) => (
            <div key={id}>
              <div
                style={{
                  width: imageSize,
                  height: imageSize,
                }}
              >
                {id}
              </div>
            </div>
          ))}
        </AntdCarousel>
      </div>

      <div className={styles.more}>
        <Button type="primary" ghost>
          {t('more')}
        </Button>
      </div>
    </>
  );
};

export default React.memo(Carousel);
