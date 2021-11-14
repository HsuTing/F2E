import React from 'react';
import { Button } from 'antd';

import styles from './styles/arrow.module.scss';

interface PropsType {
  className?: string;
  onClick?: () => void;
  icon: React.ReactElement;
}

const Arrow = ({ className, onClick, icon }: PropsType) => (
  <Button
    className={`${styles.root} ${
      /next/.test(className || '') ? styles.next : styles.prev
    }`}
    onClick={onClick}
    icon={icon}
    shape="circle"
    size="large"
  />
);

export default React.memo(Arrow);
