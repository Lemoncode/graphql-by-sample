# 01 GraphQL Frontend

In this example we are going to add a basic setup needed to support GraphlQL in frontend.

We will start from `01-graphql-backend`.

Summary steps:

- Install `graphql-request`.
- Add configuration.
- Update queries.

# Steps to build it

- `npm install` to install previous sample packages:

```bash
npm install
```

# Libraries

- We are going to install a library to work with graphql in front side, [graphql-request](https://github.com/prisma-labs/graphql-request).

```bash
npm install graphql-request --save
```

> Install this library on frontend package.json

# Other libraries

- [relay](https://github.com/facebook/relay)
- [apollo-client](https://github.com/apollographql/apollo-client)

# Config

- `graphql-request` has TypeScript support and we don't need an extra package:

### ./core/graphql.client.ts

```javascript
import { GraphQLClient } from 'graphql-request';

// TODO: Move to env variable
const url = 'http://localhost:3000/graphql';

export const graphQLClient = new GraphQLClient(url);

```

- Update `hotel-collection` api:

### ./src/pods/hotel-collection/api/hotel-collection.api.ts

```diff
- import Axios from 'axios';
- import { baseApiUrl } from 'core';
+ import { graphQLClient } from 'core/graphql.client';
import { HotelEntityApi } from './hotel-collection.api-model';

- const url = `${baseApiUrl}/api/hotels`;
+ const query = `
+   query {
+     hotels {
+       id
+       name
+       shortDescription
+       hotelRating
+       address1
+       thumbNailUrl
+     }
+   }
+ `;

+ interface Response {
+   hotels: HotelEntityApi[];
+ }

export const getHotelCollection = (): Promise<HotelEntityApi[]> =>
- Axios.get(url).then(({ data }) => data);
+ graphQLClient.request<Response>(query).then(res => res.hotels);

```

> Check `Chrome Network` content size. 11.7KB vs 3.5KB

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
