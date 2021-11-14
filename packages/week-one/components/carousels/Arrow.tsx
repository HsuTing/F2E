import React from 'react';
import { Button } from 'antd';

interface PropsType {
  onClick?: () => void;
  icon: React.ReactElement;
}

const Arrow = ({ onClick, icon }: PropsType) => (
  <Button onClick={onClick} icon={icon} shape="circle" />
);

export default React.memo(Arrow);
