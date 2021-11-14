import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { Typography, Button, Carousel as AntdCarousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import Arrow from './Arrow';
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
  const { carouselRef, imageSize, isMobile } = useCarouselInfo(350, '100%');

  return (
    <>
      <Title className={styles.title} level={2}>
        {title}
      </Title>

      <div ref={carouselRef} className={styles.carousel}>
        {!data ? null : (
          <AntdCarousel
            prevArrow={<Arrow icon={<LeftOutlined />} />}
            nextArrow={<Arrow icon={<RightOutlined />} />}
            dots={isMobile}
            infinite
            variableWidth
            adaptiveHeight
            arrows
          >
            {data.map(({ id, name, picture: { url }, ...d }) => (
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
                      background: `url(${url || ''}) center / cover ${
                        styles.imagePlaceholderBackground
                      }`,
                    }}
                  />

                  <div>
                    <Title level={4}>{name}</Title>

                    {(['address', 'date'] as const).map(key =>
                      !d[key] ? null : (
                        <div key={key}>
                          <span>
                            <Image src={`/${key}.svg`} width={16} height={16} />
                          </span>

                          {d[key]}
                        </div>
                      ),
                    )}
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
