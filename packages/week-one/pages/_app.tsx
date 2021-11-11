import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useApollo } from '../hooks/useApollo';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;
const { Item, SubMenu } = Menu;

const App = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}: AppProps) => {
  const client = useApollo(initialApolloState);
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
          <Link href="/">
            <a className={styles.home}>{t('love-taiwan')}</a>
          </Link>

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

          <div className={styles.input}>
            <Input
              prefix={<SearchOutlined />}
              placeholder={t('search')}
              size="large"
            />
          </div>

          <Menu
            className={styles.menu}
            selectedKeys={[router.asPath]}
            mode="horizontal"
          >
            {['locale', 'wish-list'].map(key =>
              key === 'locale' ? (
                <SubMenu key={key} title={t(key)}>
                  {locales.map(locale => (
                    <Item key={locale}>{t(locale)}</Item>
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
        </Header>

        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default appWithTranslation(React.memo(App));
