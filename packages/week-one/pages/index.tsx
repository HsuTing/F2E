import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { gql, useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import shuffle from 'lodash.shuffle';

import CitiesCarousel, {
  citiesCarouselQueryFragment,
} from '../components/CitiesCarousel';
import type { getHomePage as getHomePageType } from '../gqls';
import { initializeApollo } from '../hooks/useApollo';
import styles from '../styles/index.module.scss';
import { CITIES } from '../utils/constants';

interface PropsType {
  recommends: typeof CITIES;
}

const getHomePage = gql`
  query getHomePage {
    ...citiesCarouselQueryFragment
  }

  ${citiesCarouselQueryFragment}
`;

const Home = ({ recommends }: PropsType) => {
  const { t } = useTranslation('home');
  const { data } = useQuery<getHomePageType>(getHomePage);

  return (
    <>
      <div className={styles.header}>
        <Image
          src="/home-header.png"
          alt="home header"
          layout="fill"
          objectFit="cover"
        />

        <div className={styles.headerText}>
          <Image
            src="/home-header-text.png"
            alt="home header text"
            layout="fill"
          />
        </div>

        <Input
          prefix={<SearchOutlined />}
          placeholder={t('header-search')}
          size="large"
        />
      </div>

      <CitiesCarousel
        cities={filter(citiesCarouselQueryFragment, data || null)}
        recommends={recommends}
      />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const client = initializeApollo();

  try {
    await client.query<getHomePageType>({
      query: getHomePage,
    });
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      initialApolloState: client.cache.extract(),
      recommends: shuffle(CITIES),
    },
    revalidate: 1,
  };
};

export default React.memo(Home);
