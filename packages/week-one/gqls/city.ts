import { gql } from '@apollo/client';

import { carouselsFragment } from '../components/carousels/gqls';

export const getCityPage = gql`
  query getCityPage {
    ...carouselsFragment
  }

  ${carouselsFragment}
`;
