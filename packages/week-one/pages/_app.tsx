import 'antd/dist/antd.css'
import type { AppProps } from 'next/app';
import React from 'react';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default React.memo(App);
