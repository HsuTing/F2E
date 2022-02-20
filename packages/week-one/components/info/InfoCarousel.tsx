import React, { useRef } from 'react';
import { Carousel } from 'antd';

import styles from './styles/infoCarousel.module.scss';
import type { infoCarouselFragment as infoCarouselFragmentType } from '../../gqls/types';

interface PropsType {
  pictures: infoCarouselFragmentType[];
}

const InfoCarousel = ({ pictures }: PropsType) => {
  // FIXME
  const carouselRef = useRef<any>();

  return (
    <>
      <Carousel ref={carouselRef} draggable>
        {pictures.map(({ url }) => (
          <img key={url} src={url} />
        ))}
      </Carousel>

      {pictures.length <= 1 ? null : (
        <div className={styles.images}>
          {pictures.map(({ url }, index) => (
            <img
              key={url}
              style={{
                width: `calc((100% - 14px * ${pictures.length - 1}) / ${
                  pictures.length
                })`,
              }}
              src={url}
              onClick={() => carouselRef.current.goTo(index, true)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default React.memo(InfoCarousel);
