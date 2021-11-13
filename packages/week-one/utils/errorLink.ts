import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';

export default onError(({ graphQLErrors, networkError }) => {
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
});
