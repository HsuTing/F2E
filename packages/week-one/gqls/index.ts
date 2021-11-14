import { gql } from '@apollo/client';

import { citiesCarouselQueryFragment } from '../components/gqls/citiesCarousel';
import { carouselsFragment } from '../components/carousels/gqls';

export const getHomePage = gql`
  query getHomePage {
    ...citiesCarouselQueryFragment
    ...carouselsFragment
  }

  ${citiesCarouselQueryFragment}
  ${carouselsFragment}
`;
