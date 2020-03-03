import { GraphQLClient } from 'graphql-request';

// TODO: Move to env variable
const url = 'http://localhost:3000/graphql';

export const graphQLClient = new GraphQLClient(url);
