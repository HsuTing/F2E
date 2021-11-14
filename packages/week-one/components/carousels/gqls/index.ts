import { gql } from '@apollo/client';

import { carouselFragment } from './carousel';

export const carouselsFragment = gql`
  fragment carouselsFragment on Query {
    scenicSpots(first: 15)
      @rest(
        type: "[ScenicSpot!]!"
        path: "/Tourism/ScenicSpot?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    hotels(first: 15)
      @rest(
        type: "[Hotel!]!"
        path: "/Tourism/Hotel?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    activities(first: 15)
      @rest(
        type: "[Activity!]!"
        path: "/Tourism/Activity?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }
  }

  ${carouselFragment}
`;
