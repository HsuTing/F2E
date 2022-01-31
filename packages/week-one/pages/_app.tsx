import 'antd/dist/antd.css';
import React, { useState } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import { ApolloProvider } from '@apollo/client';
import { Layout, Menu } from 'antd';

import Search from '../components/Search';
import MobileMenu from '../components/MobileMenu';
import { useApollo } from '../hooks/useApollo';
import { useOutOfBreakpoint } from '../hooks/useOutOfBreakpoint';
import { usePageKey } from '../hooks/usePageKey';
import styles from '../styles/app.module.scss';
import { INFO_TYPES } from '../utils/constants';

const { Header, Content } = Layout;
const { Item, SubMenu } = Menu;

const App = ({
  Component,
  pageProps: { initialApolloState, ...pageProps },
}: AppProps) => {
  const router = useRouter();
  const client = useApollo(initialApolloState);
  const { breakpointRef, outOfBreakpoint } = useOutOfBreakpoint(
    parseInt(styles.md.replace(/px/, ''), 10),
  );
  const { t, i18n } = useTranslation();
  const pageKey = usePageKey();
  const [isOpened, setIsOpened] = useState(false);

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
            <MobileMenu
              className={styles.smaller}
              outOfBreakpoint={outOfBreakpoint}
            />

            {isOpened ? null : (
              <Link href="/">
                <a className={`${styles.home} ${styles.alwaysExist}`}>
                  {t('love-taiwan')}
                </a>
              </Link>
            )}

            {!outOfBreakpoint ? null : (
              <Menu
                className={styles.menu}
                selectedKeys={[pageKey]}
                mode="horizontal"
              >
                {INFO_TYPES.map(key => (
                  <Item key={key}>
                    <Link href={`/${key}`}>
                      <a>{t(key)}</a>
                    </Link>
                  </Item>
                ))}
              </Menu>
            )}

            <div className={`${styles.input} ${styles.alwaysExist}`}>
              <Search
                outOfBreakpoint={outOfBreakpoint}
                isOpened={isOpened}
                setIsOpened={setIsOpened}
              />
            </div>

            {!outOfBreakpoint ? null : (
              <Menu
                className={styles.menu}
                selectedKeys={[pageKey]}
                mode="horizontal"
              >
                {['locale', 'wish-list'].map(key =>
                  key === 'locale' ? (
                    <SubMenu
                      key={key}
                      title={t('locale.title')}
                      popupClassName={styles.popup}
                    >
                      {router.locales?.map(locale => (
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
