import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button, Drawer } from 'antd';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

interface PropsType {
  className: string;
  outOfBreakpoint: boolean;
}

const { Item, SubMenu, Divider } = Menu;

const MobileMenu = ({ className, outOfBreakpoint }: PropsType) => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
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
        visible={visible}
        onClose={() => setVisible(false)}
        placement="left"
      >
        <Menu selectedKeys={[router.asPath]} mode="inline">
          {['scenic-spots', 'hotels', 'activities'].map(key => (
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
