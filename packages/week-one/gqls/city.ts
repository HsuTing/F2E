import { gql } from '@apollo/client';

import { carouselsFragment } from '../components/carousels/gqls';
import { cityFragment } from '../components/city/gqls';

export const getCityPage = gql`
  query getCityPage($city: String!) {
    ...carouselsFragment
    recommend(city: $city)
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...cityFragment
      id
    }
  }

  ${carouselsFragment}
  ${cityFragment}
`;
