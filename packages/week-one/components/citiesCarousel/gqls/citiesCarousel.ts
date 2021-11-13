import { gql } from '@apollo/client';

const citiesCarouselRecommendFragment = gql`
  fragment citiesCarouselRecommendFragment on Recommend {
    id: ID
    name: Name
  }
`;

export const citiesCarouselQueryFragment = gql`
  fragment citiesCarouselQueryFragment on Query {
    Taipei: recommend(city: "Taipei")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    NewTaipei: recommend(city: "NewTaipei")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Taoyuan: recommend(city: "Taoyuan")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Taichung: recommend(city: "Taichung")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Tainan: recommend(city: "Tainan")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Kaohsiung: recommend(city: "Kaohsiung")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Keelung: recommend(city: "Keelung")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Hsinchu: recommend(city: "Hsinchu")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    HsinchuCounty: recommend(city: "HsinchuCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    MiaoliCounty: recommend(city: "MiaoliCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    ChanghuaCounty: recommend(city: "ChanghuaCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    NantouCounty: recommend(city: "NantouCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    YunlinCounty: recommend(city: "YunlinCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    ChiayiCounty: recommend(city: "ChiayiCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    Chiayi: recommend(city: "Chiayi")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    PingtungCounty: recommend(city: "PingtungCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    YilanCounty: recommend(city: "YilanCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    HualienCounty: recommend(city: "HualienCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    TaitungCounty: recommend(city: "TaitungCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    KinmenCounty: recommend(city: "KinmenCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    PenghuCounty: recommend(city: "PenghuCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }

    LienchiangCounty: recommend(city: "LienchiangCounty")
      @rest(
        type: "Recommend"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id: ID
    }
  }

  ${citiesCarouselRecommendFragment}
`;
