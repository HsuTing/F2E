import { gql } from '@apollo/client';

import { carouselFragment } from './carousel';

export const carouselsFragment = gql`
  fragment carouselsFragment on Query {
    scenicSpots: infos(type: ScenicSpot, first: 15)
      @rest(
        type: "Info"
        path: "/Tourism/{args.type}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    hotels: infos(type: Hotel, first: 15)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.type}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }

    activities: infos(type: Activity, first: 15)
      @rest(
        type: "[Info]"
        path: "/Tourism/{args.type}?$top={args.first}&$format=JSON"
      ) {
      ...carouselFragment
      id: ID
    }
  }

  ${carouselFragment}
`;
