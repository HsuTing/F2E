import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { Layout } from 'antd';

import { useApollo } from '../hooks/useApollo';
import styles from './styles/app.module.scss';

const { Header, Content } = Layout;

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Layout>
        <Header className={styles.header}>test</Header>

        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </ApolloProvider>
  );
};

export default React.memo(App);
