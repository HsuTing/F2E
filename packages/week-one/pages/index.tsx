import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { gql, useQuery } from '@apollo/client';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import CitiesCarousel from '../components/citiesCarousel';
import type { getScenicSpot as getScenicSpotType } from '../gqls';
import { initializeApollo } from '../hooks/useApollo';
import styles from '../styles/index.module.scss';

const getScenicSpot = gql`
  query getScenicSpot {
    scenicSpots
      @rest(
        type: "ScenicSpot"
        path: "/Tourism/ScenicSpot?$top=3&$format=JSON"
      ) {
      id: ID
      name: Name
    }
  }
`;

const Home = () => {
  const { t } = useTranslation('home');

  useQuery<getScenicSpotType>(getScenicSpot);

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

      <CitiesCarousel />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const client = initializeApollo();

  try {
    await client.query<getScenicSpotType>({
      query: getScenicSpot,
    });
  } catch (e) {
    // error would be handled in useApollo
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
};

export default React.memo(Home);
