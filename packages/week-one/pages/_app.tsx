import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { ApolloProvider } from '@apollo/client';
import { Layout, Menu } from 'antd';

import { useApollo } from '../hooks/useApollo';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;
const { Item } = Menu;

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);

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

          <div>
            <Menu mode="horizontal">
              {[
                {
                  text: '觀光景點',
                  href: '/',
                },
                {
                  text: '觀光旅宿',
                  href: '/',
                },
                {
                  text: '觀光活動',
                  href: '/',
                },
              ].map(({ text, href }) => (
                <Item key={text}>
                  <Link href={href}>
                    <a>{text}</a>
                  </Link>
                </Item>
              ))}
            </Menu>
          </div>
        </Header>

        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default React.memo(App);
