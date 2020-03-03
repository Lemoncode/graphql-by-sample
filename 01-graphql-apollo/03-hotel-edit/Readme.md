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
import { getHotelList } from '../data';

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

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
