# GraphQL Language Basics

* The editor tool is called __GraphiQL__ 

* We can play with online tool at https://www.graphqlhub.com/playground?query=%23%20Welcome%20to%20GraphQLHub!%20Type%20your%20GraphQL%20query%20here%2C%20or%0A%23%20explore%20the%20%22Docs%22%20to%20the%20right%0A

## 1. Playing with tool:

On start __GraphiQL__ gets all capabilities of the GraphQL server.

- Type the following query and click on play button:

```
query TestQuery {
  graphQLHub
}
```

- It returns a server description. Let's add more fields to it:

```diff
query TestQuery {
  graphQLHub
+ github {
+   user(username: "jaimesalas") {
+     id
+     login
+     avatar_url
+     company
+   }
+ }
}
```

> NOTE: replace `jaimesalas` with a valid github user name

- As we known, __username__ is a required field. We can check `Docs` section on right side to provide necessary input fields, returned types, etc. For example, we can add user's repositories to the  _query_.

```diff
query TestQuery {
  graphQLHub
  github {
    user(username: "jaimesalas") {
      id
      login
      avatar_url
      company
+     repos {
+       name
+     }
    }
  }
}
```

## 1. Exercise.

Make a _query_ to show a repository's _commits_, i.e. `GraphQL` repository which owner is `Facebook`:

```
query OtherQuery {
  github {
    repo(name: "GraphQL", ownerUsername: "Facebook") {
      commits {
        author {
          __typename
        },
        status {
          updated_at
        }
      }
    }
  }
}
```

## 2. Fields and Types.

- [Scalar Types](https://graphql.org/learn/schema/#scalar-types)

- [Enumeration Types](https://graphql.org/learn/schema/#enumeration-types)

- [List](https://graphql.org/learn/schema/#lists-and-non-null)

- [Object Types](https://graphql.org/learn/schema/#object-types-and-fields)

```
query TestQuery {
  graphQLHub
  github {
    user(username: "jaimesalas") {
      id
      login
      avatar_url
      company
      repos {
        name
      }
    }
  }
}
```

* Summary:
  - We can name the _queries_.

  - The Graphql `fields` (blue color) could belong to `scalar` (String, Int, etc) or another type like `GithubUser`.

  - It has optional or required fields (using `!`).

    - _repos_ is an optional object list: `repos: [GithubRepo]`.

  - GraphQL fields are modeled as functions (`resolvers`). It accepts arguments or not, and it returns some type as response. The server implements the `resolver` to be executed for each field (in Javascript or whatever server language). For example, the _graphQLHub_ field always returns the following string:

```json
  "graphQLHub": "Use GraphQLHub to explore popular APIs with GraphQL! Created by Clay Allsopp @clayallsopp"
```
  - The _user_ field accepts one argument and uses that argument on the resolver function.
  - Scalar fields are the basic types, they represent primitive values like _strings_ and _integers_. 
  - The fields that represent objects usually have a _custom_ type.
  - The collection fields, like _repos_, are lists that contain objects of ceratin types.
  - Spaces and `,` are optional. 


## 3. Variables

* Variables could be of any type.
* They are declared on a context.

For example in the next query we have a _hard coded_ value, let's replace it to use a variable:

```diff
- query TestQuery {
+ query TestQuery($currentUserName: String!) {
    graphQLHub
    github {
-     user(username: "jaimesalas") {
+     user(username: $currentUserName) {
        id
        login
        avatar_url
        company
        repos {
          name
        }
      }
    }
  }

```

Now we can feed the variable using _json_ format:

```json
{
  "currentUserName": "jaimesalas"
}
```

> If you want create a `custom` variable type, you have to use [input](https://graphql.org/learn/schema/#input-types) type.

## 4. Directives

Sometimes using just the field arguments to customize the behavior of the GraphQL server execution engine will not be enough. For example, what if we had a special variable in our application, call it _includeRepos_, and we want to customize the GraphQL server response to only include the repo list when this variable is set to _true_, and completely omit the repos list from the response when the _includeRepos_ variable is set to _false_.

The best way to do this in GraphQL is with a _directive_. Directives can be used to alter the GraphQL _runtime_ execution, and they are commonly used  with variables to customize the reponse based on the variables values.

* built-in directives -> _skip_, _include_, both can be used on fields and fragments.

```diff
query TestQuery(
  $currentUserName: String!,
+ $includeRepos: Boolean!
) {
  github {
    user(username: $currentUserName) {
      id,
      avatar_url,
      company,
-     repos {
+     repos @include(if: $includeRepos) {
        name
      }
    }
  }
}
```

## 5. Aliases.

Sometimes the _data_ exposed by the server might have different property names from what the UI is using.

For example, let's assume our UI uses a variable called _githubid_ instead of just _Id_. Now we would have a mismatch between the server response, which has "id" as the key to this value, and the UI component, which expects the property to be "githubid". This usually means that we would need to process the server response on the client to make it match what the UI is using. 

GraphQL _aliases_ can help us avoid this extra processing. We can simply use an alias name in the query to rename the key used in the server response. _githubid_ is _id_, and when we execute that, the response will be just ready for the UI. No further processing needed.

We can use aliases on any field to customize its appearance in the response.

```diff
query TestQuery(
  $currentUserName: String!,
  $includeRepos: Boolean!
) {
  github {
    user(username: $currentUserName) {
-     id,
+     githubid: id,
      avatar_url,
      company,
      repos @include(if: $includeRepos) {
        name
      }
    }
  }
}
```

> NOTE: We can also use aliases to ask for the same field more than once. 


## 6. Fragments

_Fragments_ are what make GraphQL _composable_. 

In the next example, we repeated the _user_ information fields in our _TwoUsers query_ twice, once for every user. 


```
query TwoUsers(
  $userA: String!,
  $userB: String!
) {
  github {
    userA: user(username: $userA) {
      id,
      avatar_url,
      company
    },
    userB: user(username: $userB) {
      id,
      avatar_url,
      company
    }
  }
}
```

```json
{
  "userA": "jaimesalas",
  "userB": "brauliodiez"
}
```

If we later decide to ask for an extra field on every _user_ object, we'll have to change two places in our query, which is not ideal. We can use _GraphQL fragments_ to refactor this repetition and compose our main _query_ using a smaller _query_ fragment that represents the fields on a GitHub user.

```diff
query TwoUsers(
  $userA: String!,
  $userB: String!
) {
  github {
    userA: user(username: $userA) {
      id,
      avatar_url,
      company
    },
    userB: user(username: $userB) {
      id,
      avatar_url,
      company
    }
  }
}

+fragment UserInfo on GithubUser {
+ id,
+ company,
+ avatar_url
+}
```

With this on place we can use it where ever these fields are requested. A _fragment_ is a partial operation, we can use it by its own but we can use it and reuse it inside a full opertion.

```diff
query TwoUsers(
  $userA: String!,
  $userB: String!
) {
  github {
    userA: user(username: $userA) {
-     id,
-     avatar_url,
-     company
+     ...UserInfo
    },
    userB: user(username: $userB) {
-     id,
-     avatar_url,
-     company
+     ...UserInfo
    }
  }
}
```

> NOTE: The content of the fragment has to fit in the place where it's used.

## 7. Inline Fragments

We can use fragment inline style:

```diff
query TwoUsers(
  $userA: String!,
  $userB: String!
){
  github {
    userA: user(username: $userA) {
      ...UserInfo
    },
    userB: user(username: $userB) {
-     ...UserInfo
+     ... on GithubUser {
+       id,
+       company,
+       avatar_url
+     }
    }
  }
}
```

## 8. Interface and Union

In GraphQL, we can define a group type which can be either an _interface_ or a _union_ of multiple types. Those types basically allow us to combine multiple types for a single field. However, why would we need to do so? Sometimes objects have different types based on how we use them.

In a company's people database, a person can be either an employee or a vendor. In GraphQL, we model this relation with an _interface_ type. We say a PersonType is an _interface_, and both EmployeeType and VendorType implement this PersonType _interface_.

Sometimes an object can be represented by one of two types. For example, the author of a GitHub repo commit can be a user of the GitHub platform or a guest user that does not have a GitHub username. But both of these types represent an author object. In GraphQL, we model this relation with a _union_ type, we say an AuthorType is a _union_ of both GitHub User, and a guest CommitAuthor.

```
{
  github {
    repo(name: "graphql", ownerUsername: "facebook") {
      commits {
        message,
        author {
          ... on GithubUser {
            login
          }
          ... on GithubCommitAuthor {
            email
          }
        }
      }
    }
  }
}
```

## 9. Mutations

Updating data, this can be done using _mutations_

```
mutation AddResource($input: CreateLinkInput!) {
  createLink(input: $input) {
    linkEdge {
      node {
        id
      }
    }
  }
}
```


```json
{
  "input": {
    "title": "GraphQLHub",
    "url": "https://www.graphqlhub.com/",
    "clientMutationId": 42
  }
}
```

All mutation opertions returns something to the client, in this case _linkEdge_.
