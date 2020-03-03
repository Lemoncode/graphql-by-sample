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

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
