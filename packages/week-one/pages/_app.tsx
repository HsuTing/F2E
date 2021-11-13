import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Layout, Menu, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import Search from '../components/Search';
import { useApollo } from '../hooks/useApollo';
import { useOutOfBreakpoint } from '../hooks/useOutOfBreakpoint';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;
const { Item, SubMenu } = Menu;

const App = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}: AppProps) => {
  const client = useApollo(initialApolloState);
  const { breakpointRef, outOfBreakpoint } = useOutOfBreakpoint(
    parseInt(styles.md.replace(/px/, ''), 10),
  );
  const router = useRouter();
  const { t, i18n } = useTranslation();
  // @ts-ignore next-i18next types error
  const locales = i18n.options.locales as string[];

  return (
    <ApolloProvider client={client}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=optional"
          rel="stylesheet"
        />
      </Head>

      <Layout className={styles.root}>
        <Header className={styles.header}>
          <div ref={breakpointRef}>
            <Button className={styles.smaller} type="text">
              <MenuOutlined />
            </Button>

            <Link href="/">
              <a className={`${styles.home} ${styles.alwaysExist}`}>
                {t('love-taiwan')}
              </a>
            </Link>

            {!outOfBreakpoint ? null : (
              <Menu
                className={styles.menu}
                selectedKeys={[router.asPath]}
                mode="horizontal"
              >
                {['scenic-spots', 'hotels', 'activities'].map(key => (
                  <Item key={key}>
                    <Link href={`/${key}`}>
                      <a>{t(key)}</a>
                    </Link>
                  </Item>
                ))}
              </Menu>
            )}

            <div className={`${styles.input} ${styles.alwaysExist}`}>
              <Search />
            </div>

            {!outOfBreakpoint ? null : (
              <Menu
                className={styles.menu}
                selectedKeys={[router.asPath]}
                mode="horizontal"
              >
                {['locale', 'wish-list'].map(key =>
                  key === 'locale' ? (
                    <SubMenu
                      key={key}
                      title={t('locale.title')}
                      popupClassName={styles.popup}
                    >
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
            )}
          </div>
        </Header>

        <Content className={styles.content}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default appWithTranslation(React.memo(App));
