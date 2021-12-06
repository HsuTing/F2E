import { gql } from '@apollo/client';

export const infoFragment = gql`
  fragment infoFragment on Info {
    id: ID
    name: Name
  }
`;
