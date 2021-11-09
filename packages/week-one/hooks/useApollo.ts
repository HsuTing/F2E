import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import type { NormalizedCacheObject } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';
import merge from 'deepmerge';

let apolloClientCache: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new RestLink({
      uri: 'https://ptx.transportdata.tw/MOTC/v2/',
    }),
    cache: new InMemoryCache(),
  });

export const initializeApollo = (
  initialState: NormalizedCacheObject | null = null,
) => {
  const apolloClient = apolloClientCache ?? createApolloClient();

  if (initialState) {
    const existingCache = apolloClient.extract();
    const data = merge(initialState, existingCache);

    apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return apolloClient;

  if (!apolloClientCache) apolloClientCache = apolloClient;

  return apolloClient;
};

export const useApollo = (initialState: NormalizedCacheObject) =>
  useMemo(() => initializeApollo(initialState), [initialState]);
