import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Button, Drawer, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { usePageKey } from '../hooks/usePageKey';
import { INFO_TYPES } from '../utils/constants';
import styles from './styles/mobileMenu.module.scss';

interface PropsType {
  className: string;
  outOfBreakpoint: boolean;
}

const { Item, SubMenu, Divider } = Menu;

const MobileMenu = ({ className, outOfBreakpoint }: PropsType) => {
  const { t, i18n } = useTranslation();
  const pageKey = usePageKey();
  const [visible, setVisible] = useState(false);
  // @ts-ignore next-i18next types error
  const locales = i18n.options.locales as string[];

  useEffect(() => {
    setVisible(false);
  }, [outOfBreakpoint]);

  return (
    <>
      <Button className={className} type="text">
        <MenuOutlined onClick={() => setVisible(true)} />
      </Button>

      <Drawer
        className={styles.root}
        visible={visible}
        onClose={() => setVisible(false)}
        width={300}
        placement="left"
      >
        <Menu selectedKeys={[pageKey]} mode="inline">
          {INFO_TYPES.map(key => (
            <Item key={key}>
              <Link href={`/${key}`}>
                <a>{t(key)}</a>
              </Link>
            </Item>
          ))}

          <Divider />

          {['locale', 'wish-list'].map(key =>
            key === 'locale' ? (
              <SubMenu key={key} title={t('locale.title')}>
                {locales.map(locale => (
                  <Item
                    key={locale}
                    onClick={() => i18n.changeLanguage(locale)}
                  >
                    {t(`locale.${locale}`)}
                  </Item>
                ))}
              </SubMenu>
            ) : (
              <Item key={key}>
                <Link href={`/${key}`}>
                  <a>{t(key)}</a>
                </Link>
              </Item>
            ),
          )}
        </Menu>
      </Drawer>
    </>
  );
};

export default React.memo(MobileMenu);
