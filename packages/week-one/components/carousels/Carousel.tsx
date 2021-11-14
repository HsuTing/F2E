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
    | carouselsFragmentType['activities']
    | null;
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
        {!data ? null : (
          <AntdCarousel infinite variableWidth>
            {data.map(({ id, name, picture: { url }, address, date }) => (
              <div key={id}>
                <div
                  className={styles.card}
                  style={{
                    width: imageSize,
                  }}
                >
                  <div
                    style={{
                      width: imageSize,
                      background: `url(${url}) center / cover ${styles.imagePlaceholderBackground}`,
                    }}
                  />

                  <div>
                    <Title level={4}>{name}</Title>
                    <div>{address}</div>
                    <div>{date}</div>
                  </div>
                </div>
              </div>
            ))}
          </AntdCarousel>
        )}
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
