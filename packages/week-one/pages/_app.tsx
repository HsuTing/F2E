import 'antd/dist/antd.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../hooks/useApollo';

const App = ({ Component, pageProps }: AppProps) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default React.memo(App);
