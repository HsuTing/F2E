import React from 'react';
import { Typography } from 'antd';

import styles from './styles/carousel.module.scss';

interface PropsType {
  title: React.ReactElement;
}

const { Title } = Typography;

const Carousel = ({ title }: PropsType) => {
  return (
    <>
      <Title className={styles.title} level={2}>
        {title}
      </Title>
    </>
  );
};

export default React.memo(Carousel);
