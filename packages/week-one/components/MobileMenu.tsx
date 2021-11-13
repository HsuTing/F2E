import React, { useState, useEffect } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface PropsType {
  className: string;
  outOfBreakpoint: boolean;
}

const MobileMenu = ({ className, outOfBreakpoint }: PropsType) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, [outOfBreakpoint]);

  return (
    <>
      <Button className={className} type="text">
        <MenuOutlined onClick={() => setVisible(true)} />
      </Button>

      <Drawer
        visible={visible}
        onClose={() => setVisible(false)}
        placement="left"
      >
        <div />
      </Drawer>
    </>
  );
};

export default React.memo(MobileMenu);
