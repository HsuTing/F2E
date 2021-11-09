import { useMemo } from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { onError } from '@apollo/client/link/error';
import { RestLink } from 'apollo-link-rest';
import merge from 'deepmerge';
import { notification } from 'antd';

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
      onError(({ graphQLErrors, networkError }) => {
        const errorLog =
          typeof window === 'undefined'
            ? console.error
            : ({ name, ...message }: { name: string }) =>
                notification.error({
                  message: `${name} Error!`,
                  description: JSON.stringify(message),
                });

        if (graphQLErrors)
          graphQLErrors.forEach(graphQLError => {
            errorLog({
              ...graphQLError,
              name: 'GraphQL',
            });
          });

        if (networkError)
          errorLog({
            ...networkError,
            name: 'Network',
          });
      }),
      new RestLink({
        uri: 'https://ptx.transportdata.tw/MOTC/v2/',
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
