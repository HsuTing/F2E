import React from 'react';
import { Typography } from 'antd';

interface PropsType {
  title: React.ReactElement;
}

const { Title } = Typography;

const Carousel = ({ title }: PropsType) => {
  return (
    <>
      <Title level={2}>{title}</Title>
    </>
  );
};

export default React.memo(Carousel);
