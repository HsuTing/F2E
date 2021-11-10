import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { Layout, Menu, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { useApollo } from '../hooks/useApollo';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;
const { Item } = Menu;

const App = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}: AppProps) => {
  const client = useApollo(initialApolloState);
  const router = useRouter();

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
            <a className={styles.home}>愛歹丸</a>
          </Link>

          <Menu
            className={styles.menu}
            selectedKeys={[router.asPath]}
            mode="horizontal"
          >
            {[
              {
                text: '觀光景點',
                href: '/scenicSpots',
              },
              {
                text: '觀光旅宿',
                href: '/hotels',
              },
              {
                text: '觀光活動',
                href: '/activities',
              },
            ].map(({ text, href }) => (
              <Item key={href}>
                <Link href={href}>
                  <a>{text}</a>
                </Link>
              </Item>
            ))}
          </Menu>

          <div className={styles.input}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="全站搜索"
              size="large"
            />
          </div>

          <Menu
            className={styles.menu}
            selectedKeys={[router.asPath]}
            mode="horizontal"
          >
            {[
              {
                text: '語言',
                href: 'locale',
              },
              {
                text: '心願清單',
                href: '/wish-list',
              },
            ].map(({ text, href }) => (
              <Item key={href}>
                <Link href={href}>
                  <a>{text}</a>
                </Link>
              </Item>
            ))}
          </Menu>
        </Header>

        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default React.memo(App);
