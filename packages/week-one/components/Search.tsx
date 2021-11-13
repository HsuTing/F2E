import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import styles from './styles/search.module.scss';

interface PropsType {
  outOfBreakpoint: boolean;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

const Search = ({ outOfBreakpoint, isOpened, setIsOpened }: PropsType) => {
  const { t } = useTranslation();

  useEffect(() => {
    setIsOpened(false);
  }, [outOfBreakpoint]);

  return (
    <Input
      className={`${outOfBreakpoint ? '' : styles.root} ${
        outOfBreakpoint || isOpened ? '' : styles.isClosed
      }`}
      prefix={!outOfBreakpoint ? null : <SearchOutlined />}
      suffix={
        outOfBreakpoint ? null : (
          <SearchOutlined onClick={() => setIsOpened(!isOpened)} />
        )
      }
      bordered={isOpened || outOfBreakpoint}
      placeholder={!isOpened && !outOfBreakpoint ? '' : t('search')}
      size="large"
    />
  );
};

export default React.memo(Search);
