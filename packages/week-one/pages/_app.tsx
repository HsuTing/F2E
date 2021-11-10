import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { Layout } from 'antd';

import { useApollo } from '../hooks/useApollo';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;

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
        <Header className={styles.header}>test</Header>

        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default React.memo(App);
