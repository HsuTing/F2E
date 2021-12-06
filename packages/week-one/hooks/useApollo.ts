import { useMemo } from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { RestLink } from 'apollo-link-rest';
import merge from 'deepmerge';

import errorLink from '../utils/errorLink';
import headerLink from '../utils/headerLink';

let apolloClientCache: ApolloClient<NormalizedCacheObject> | null = null;

const createApolloClient = () =>
  new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      new RetryLink({
        attempts: {
          retryIf: error => Boolean(error) && error.statusCode !== 401,
        },
      }),
      errorLink,
      headerLink,
      new RestLink({
        uri: 'https://ptx.transportdata.tw/MOTC/v2',
        headers: {
          'Accept-Encoding': 'gzip',
          algorithm: 'hmac-sha1',
        },
        endpoints: {
          single: {
            uri: 'https://ptx.transportdata.tw/MOTC/v2',
            responseTransformer: async response => {
              const data = await response.json();

              // FIXME: should return null
              return data[0] || {};
            },
          },
        },
      }),
    ]),
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
