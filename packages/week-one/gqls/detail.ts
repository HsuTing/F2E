import { gql } from '@apollo/client';

import { carouselsFragment } from '../components/carousels/gqls';

export const getDetailPage = gql`
  query getDetailPage {
    ...carouselsFragment
  }

  ${carouselsFragment}
`;
