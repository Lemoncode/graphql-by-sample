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

- We are going to install the main library to work with graphql and express, [apollo-server-express](https://www.npmjs.com/package/apollo-server-express). ([Documentation page](https://www.apollographql.com/docs/apollo-server/))

```bash
cd ./server
npm install apollo-server-express --save
```

# Config

- ApolloServer comes with types definitions and we don't need an extra package for TypeScript. We have to define a new `ApolloServer` instance to create a new `GraphQL Server`:

# About Basefactor + Lemoncode

We are an innovating team of Javascript experts, passionate about turning your ideas into robust products.

[Basefactor, consultancy by Lemoncode](http://www.basefactor.com) provides consultancy and coaching services.

[Lemoncode](http://lemoncode.net/services/en/#en-home) provides training services.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend
