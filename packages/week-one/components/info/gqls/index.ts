import { gql } from '@apollo/client';

import { infoCarouselFragment } from './infoCarousel';

export const infoFragment = gql`
  fragment infoFragment on Info {
    id
    name
    zipCode
    isLiked @client
    address
    phone
    date
    descriptionDetail
    ticketInfo
    travelInfo
    remarks
    comments
    websiteUrl
    pictures @type(name: "Picture") {
      ...infoCarouselFragment
    }
  }

  ${infoCarouselFragment}
`;
