import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Hotel {
    id: String!
    type: String!
    name: String!
    address1: String!
    city: String!
    hotelRating: Float!
    shortDescription: String!
    thumbNailUrl: String!
    tripAdvisorRating: Float!
    tripAdvisorRatingUrl: String!
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel!
  }

  input HotelEdit {
    id: String!
    name: String!
    address1: String!
    city: String!
    hotelRating: Float!
    shortDescription: String!
  }

  type Mutation {
    saveHotel(hotelEdit: HotelEdit!): Boolean
  }
`;
