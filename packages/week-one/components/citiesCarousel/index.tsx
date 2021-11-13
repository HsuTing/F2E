import React from 'react';
import { useTranslation } from 'next-i18next';
import { Typography } from 'antd';

const { Title } = Typography;

const CitiesCarousel = () => {
  const { t } = useTranslation('home');

  return <Title level={2}>{t('maybe-go')}</Title>;
};

export default React.memo(CitiesCarousel);
