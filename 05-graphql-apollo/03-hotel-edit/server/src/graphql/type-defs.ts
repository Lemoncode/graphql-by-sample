import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Hotel {
    id: String!
    type: String!
    name: String!
    created: Int!
    modified: Int!
    address1: String!
    city: String!
    hotelRating: Int!
    shortDescription: String!
    thumbNailUrl: String!
    tripAdvisorRating: Int!
    tripAdvisorRatingUrl: String!
  }

  type Query {
    hotels: [Hotel!]!
  }
`;
