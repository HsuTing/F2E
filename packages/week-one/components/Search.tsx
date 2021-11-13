import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';

const Search = () => {
  const { t } = useTranslation();

  return (
    <Input prefix={<SearchOutlined />} placeholder={t('search')} size="large" />
  );
};

export default React.memo(Search);
