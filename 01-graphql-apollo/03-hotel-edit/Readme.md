# 03 Hotel edit

In this example we are going to add backend and frontend changes to move hotel-edit to GraphQL.

We will start from `02-graphql-frontend`.

Summary steps:

- Update backend.
- Update frontend.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

# Steps

- Let's define `type-defs` for get one hotel by id:

### ./server/src/graphql/type-defs.ts

```diff
...

  type Query {
    hotels: [Hotel!]!
+   hotel(id: ID!): Hotel!
  }
`;

```

- Implement resolver:

### ./server/src/graphql/resolvers.ts

```diff
- import { getHotelList } from '../data';
+ import { getHotelList, getHotel } from '../data';

export const resolvers = {
  Query: {
    hotels: async () => {
      const hotels = await getHotelList();
      return hotels;
    },
+   hotel: async (parent, args) => {
+     const hotel = await getHotel(args.id);
+     return hotel;
+   },
  },
};

```

> [Resolver signature](https://www.apollographql.com/docs/apollo-server/data/data/#resolver-type-signature)

- We can play with graphql development tool at [http://localhost:3000/graphql](http://localhost:3000/graphql)

- Now, it's time to update `hotel-edit` api:

### ./src/pods/hotel-edit/api/hotel-edit.api.ts

```diff
import Axios from 'axios';
import { baseApiUrl } from 'core';
+ import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi, HotelEditApi } from './hotel-edit.api-model';

const url = `${baseApiUrl}/api/hotels`;

+ interface GetHotelResponse {
+   hotel: HotelEntityApi;
+ }

- export const getHotel = (id): Promise<HotelEntityApi> =>
-   Axios.get(`${url}/${id}`).then(({ data }) => data);
+ export const getHotel = (id): Promise<HotelEntityApi> => {
+   const query = `
+     query {
+       hotel(id: "${id}") {
+         id
+         name
+         shortDescription
+         hotelRating
+         address1
+         thumbNailUrl
+         city
+       }
+     }
+   `;

+   return graphQLClient.request<GetHotelResponse>(query).then(res => res.hotel);
+ };

export const saveHotel = (hotel: HotelEditApi): Promise<boolean> =>
  Axios.patch(`${url}/${hotel.id}`, hotel);

```

- Run front project:

```bash
npm start
```

- Let's implement save hotel. We will create an [input](https://graphql.org/learn/schema/#input-types) type to model hotel editing fields:

### ./server/src/graphql/type-defs.ts

```diff
...

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel!
  }

+ input HotelEdit {
+   id: String!
+   name: String!
+   address1: String!
+   city: String!
+   hotelRating: Float!
+   shortDescription: String!
+ }

+ type Mutation {
+   saveHotel(hotelEdit: HotelEdit!): Boolean
+ }
`;

```

- Let's implement the resolver:

### ./server/src/graphql/resolvers.ts

```diff
- import { getHotelList, getHotel } from '../data';
+ import { getHotelList, getHotel, saveHotel } from '../data';

export const resolvers = {
  Query: {
    hotels: async () => {
      const hotels = await getHotelList();
      return hotels;
    },
    hotel: async (parent, args) => {
      const hotel = await getHotel(args.id);
      return hotel;
    },
  },
+ Mutation: {
+   saveHotel: async (parent, args) => {
+     await saveHotel(args.hotelEdit);
+     return true;
+   },
+ },
};

```

- Give a try using the following query at [http://localhost:3000/graphql](http://localhost:3000/graphql):

```graphql
mutation {
  saveHotel(hotelEdit: {
    id: "0248058a-27e4-11e6-ace6-a9876eff01b3"
    name: "Updated name"
    address1: "Updated address1"
    city: "Updated city"
    hotelRating: 5
    shortDescription: "Updated shortDescription"
  })
}
```

- We can use a [variable](https://graphql.org/learn/queries/#variables) too:

```graphql
mutation($hotelEdit: HotelEdit!) {
  saveHotel(hotelEdit: $hotelEdit)
}
```

```json
{
  "hotelEdit": {
    "id": "0248058a-27e4-11e6-ace6-a9876eff01b3",
    "name": "Using variable name",
    "address1": "Using variable address1",
    "city": "Using variable city",
    "hotelRating": 3,
    "shortDescription": "Using variable shortDescription"
  }
}
```

- Now, it's time to update `hotel-edit` api again:

### ./src/pods/hotel-edit/api/hotel-edit.api.ts

```diff
- import Axios from 'axios';
- import { baseApiUrl } from 'core';
import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi, HotelEditApi } from './hotel-edit.api-model';

- const url = `${baseApiUrl}/api/hotels`;

...

+ interface SaveHotelResponse {
+   saveHotel: boolean;
+ }

- export const saveHotel = (hotel: HotelEditApi): Promise<boolean> =>
-   Axios.patch(`${url}/${hotel.id}`, hotel);
+ export const saveHotel = (hotel: HotelEditApi): Promise<boolean> => {
+   const query = `
+     mutation($hotelEdit: HotelEdit!) {
+       saveHotel(hotelEdit: $hotelEdit)
+     }
+   `;

+  return graphQLClient
+    .request<SaveHotelResponse>(query, {
+      hotelEdit: hotel,
+    })
+    .then(res => res.saveHotel);
+};

```

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
