import React, { useRef } from 'react';
import { Carousel } from 'antd';

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
        <div>
          {pictures.map(({ url }, index) => (
            <img
              key={url}
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
