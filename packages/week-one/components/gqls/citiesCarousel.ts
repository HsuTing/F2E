import { gql } from '@apollo/client';

const citiesCarouselRecommendFragment = gql`
  fragment citiesCarouselRecommendFragment on Recommend {
    id
    pictures @type(name: "[Picture]!") {
      url
    }
  }
`;

export const citiesCarouselQueryFragment = gql`
  fragment citiesCarouselQueryFragment on Query {
    Taipei: recommend(city: "Taipei")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    NewTaipei: recommend(city: "NewTaipei")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Taoyuan: recommend(city: "Taoyuan")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Taichung: recommend(city: "Taichung")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Tainan: recommend(city: "Tainan")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Kaohsiung: recommend(city: "Kaohsiung")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Keelung: recommend(city: "Keelung")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Hsinchu: recommend(city: "Hsinchu")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    HsinchuCounty: recommend(city: "HsinchuCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    MiaoliCounty: recommend(city: "MiaoliCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    ChanghuaCounty: recommend(city: "ChanghuaCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    NantouCounty: recommend(city: "NantouCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    YunlinCounty: recommend(city: "YunlinCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    ChiayiCounty: recommend(city: "ChiayiCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    Chiayi: recommend(city: "Chiayi")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    PingtungCounty: recommend(city: "PingtungCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    YilanCounty: recommend(city: "YilanCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    HualienCounty: recommend(city: "HualienCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    TaitungCounty: recommend(city: "TaitungCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    KinmenCounty: recommend(city: "KinmenCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    PenghuCounty: recommend(city: "PenghuCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }

    LienchiangCounty: recommend(city: "LienchiangCounty")
      @rest(
        type: "Recommend"
        endpoint: "single"
        path: "/Tourism/ScenicSpot/{args.city}?$top=1&$format=JSON"
      ) {
      ...citiesCarouselRecommendFragment
      id
    }
  }

  ${citiesCarouselRecommendFragment}
`;
