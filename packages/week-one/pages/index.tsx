import React from 'react';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { gql, useQuery } from '@apollo/client';

import type { getScenicSpot as getScenicSpotType } from '../gqls';
import { initializeApollo } from '../hooks/useApollo';

import styles from './styles/index.module.scss';

const getScenicSpot = gql`
  query getScenicSpot {
    scenicSpots
      @rest(
        type: "ScenicSpot"
        path: "Tourism/ScenicSpot?$top=3&$format=JSON"
      ) {
      id: ID
      name: Name
    }
  }
`;

const Home = () => {
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
      </div>
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
      ...(await serverSideTranslations(locale, ['common'])),
      initialApolloState: client.cache.extract(),
    },
    revalidate: 1,
  };
};

export default React.memo(Home);
