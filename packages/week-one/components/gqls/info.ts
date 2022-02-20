import { gql } from '@apollo/client';

export const infoFragment = gql`
  fragment infoFragment on Info {
    id
    name
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
      url
    }
  }
`;
