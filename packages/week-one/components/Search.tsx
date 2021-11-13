import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'next-i18next';

interface PropsType {
  outOfBreakpoint: boolean;
}

const Search = ({ outOfBreakpoint }: PropsType) => {
  const { t } = useTranslation();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setIsOpened(false);
  }, [outOfBreakpoint]);

  return (
    <Input
      prefix={!outOfBreakpoint ? null : <SearchOutlined />}
      suffix={outOfBreakpoint ? null : <SearchOutlined />}
      bordered={isOpened || outOfBreakpoint}
      placeholder={!isOpened && !outOfBreakpoint ? '' : t('search')}
      size="large"
    />
  );
};

export default React.memo(Search);
