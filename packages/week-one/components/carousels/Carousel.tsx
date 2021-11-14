import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography, Button } from 'antd';

import styles from './styles/carousel.module.scss';

interface PropsType {
  title: React.ReactElement;
}

const { Title } = Typography;

const Carousel = ({ title }: PropsType) => {
  const { t } = useTranslation('carousels');

  return (
    <>
      <Title className={styles.title} level={2}>
        {title}
      </Title>

      <div className={styles.more}>
        <Button type="primary" ghost>
          {t('more')}
        </Button>
      </div>
    </>
  );
};

export default React.memo(Carousel);
