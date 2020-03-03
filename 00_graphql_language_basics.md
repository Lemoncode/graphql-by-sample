# GraphQL Language Basics

* La herramienta de edición se llama __GraphiQL__ 

* Podemos visitar un servidor de GraphQL en https://www.graphqlhub.com/playground?query=%23%20Welcome%20to%20GraphQLHub!%20Type%20your%20GraphQL%20query%20here%2C%20or%0A%23%20explore%20the%20%22Docs%22%20to%20the%20right%0A

## 1. Explorando el navegador:

Al arrancar __GraphiQL__ carga todas las capacidades que ofrece el servidor de __GraphQL__

Introducir la siguiente query dentro del editor y utilizar el botón de play

```
query TestQuery {
  graphQLHub
}
```

Nos da como resultado una descripción del propio servidor. Vamos a hacer algo un poco más ambicioso:

```
query TestQuery {
  graphQLHub
  github {
    user(username: "jaimesalas") {
      id,
      avatar_url,
      company
    }
  }
}
```
Como podemos comprobar __username__ es un campo requerido. El editor nos da feedback de los campos y como debemos alimentarlos. Por ejemplo podemos extender la _query_ para visualizar los repositorios asociados a un usuario.

```
query TestQuery {
  graphQLHub
  github {
    user(username: "jaimesalas") {
      id,
      avatar_url,
      company,
      repos {
        name
      }
    }
  }
}
```

## 1. Ejercicio.

Crear una _query_ que muestre los _commits_ realizados sobre el repositorio de __GraphQL__

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



## 2. Fields. Campos escalares y complejos.

```
query TestQuery {
  graphQLHub
  github {
    user(username: "jaimesalas") {
      id,
      avatar_url,
      company,
      repos {
        name
      }
    }
  }
}
```

* Recapitulando:
  - Podemos usar nombres sobre las _queries_
  - Los campos de GraphiQL son tipos en azul, tenemos campos escalares y campos comlejos como _user_.
  - _repos_ representa una lista de objetos.
  - Los campos GraphQL (scalar y complex) son modelados después de las funciones. Aceptan argumentos, y devuelven algo en la respuesta. En el servidor escribiremos funciones de JavaScript para determinar el valor devuelto por cada campo. Por ejemplo la función que resuelve _graphQLHub_ determina que tenemos que responder con:

```json
  "graphQLHub": "Use GraphQLHub to explore popular APIs with GraphQL! Created by Clay Allsopp @clayallsopp"
```
  - El campo _user_ acepta un argumento y utiliza ese argumento en la función para resolver los datos.
  - Los campos escalares son los tipos básicos, representan valores primitivos como _strings_ y _integers_
  - Los campos que representan objetos normalmente son un tipo _custom_
  - Los campos de colección, como _repos_, son listas que contienen objetos de un determinado tipo.
  - Los espacios, `,` son opcionales. 


## 3. Variables

* Las variables pueden ser de cualquier tipo.
* Las variables son declaradas en un contexto.

Por ejemplo la siguiente query tiene un valor _hard coded_, vamos a reemplazarlo por una variable:

```
query TestQuery {
  github {
    user(username: "jaimesalas") {
      id,
      avatar_url,
      company,
      repos {
        name
      }
    }
  }
}
```

```diff
-query TestQuery {
+query TestQuery($currentUserName: String!) {
  github {
-   user(username: "jaimesalas") {
+   user(username: $currentUserName) {
      id,
      avatar_url,
      company,
      repos {
        name
      }
    }
  }
}
```

Ahora podemos alimentar la variable usando formato _json_

```json
{
  "currentUserName": "jaimesalas"
}
```

## 4. Directives

Algunas veces utilizando simplemente los argumentos de los campos para personalizar el comportamineto de ejecución del motor del servidor GraphQL no es suficiente. Por ejemplo, imaginemos que tenemos una variable especial en nuestra aplicación, que se llama _includeRepos_, y la queremos personalizar el servidor de GraphQL para que en la respuesta sólo incluya los repos si esta variable tiene el valor _true_, y que omita completamente la lista de repos si _includeRepos_ tiene el valor _false_.

The best way to do this in GraphQL is witha adirective. Directives can be used to alter the GraphQL runtime execution, and they are commonly used  with variables to customize the reponse based on the variables values.

La mejor forma de hacer esto es mediante un _directiva_. Las directiivas pueden ser usadas para alterar la ejecución del _runtime_ de GraphQL, y son normalmente utilizadas con variables para personalizar la respuesta basada en los valores de las variables.

* built-in directives -> _skip_, _include_, ambas pueden ser usadas en campos y fragmentos.

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

Algunas veces el _data_ expuesto por el servdor puede tener distintos nombres de propiedades con respecto a lo que está utilizando la UI.

Por ejemplo asumamos, que nuestra UI usa una variable llamada _githubid_ en lugar de simplemente _Id_. Tendremos ahora una desincronización entre la respuesta del servidor, que tiene `id` para la _key_ de su valor, y el componente de UI, que espera la propiedad `githubid`. Normalmente esto lo salvamos procesando la respuesta mediante _mappers_.

Los _aliases_ de GraphQL pueden ayudar a evitar este procesamiento extra. Simplemente podemos usar un _nombre alias_ en la _query_ para renombrar la _key_ usada en la respuesta del servidor. _githubid_ es _id_, y cuando lo ejecutamos, la respuesta estará lista para la UI. No se necesita más procesamiento.

Podemos usar alias en cualquier campo para personalizar su apariencia en la respuesta.

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

> NOTA: Pdemos usar los alias para preguntar por el mismo campo más de una vez. 


## 6. Fragments

Los _fragments_ es lo que hace GraphQL _composable_.

En este ejemplo, repetimos los campos de información del _user_ en nuestra _query TwoUsers_ dos veces, una por cada usuario.

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

Si después decidimos pedir un campo extra en cada objeto _user_, tendremos que cambiar en nuestra _query_ en dos sitios distintos, lo que no es ideal. Podemos usar los _GraphQL fragments_ para refactorizar está repetición y componer nuestra _query_ principal utilizando una _query_ más pequeña que represente los campos del usuario de GitHub.


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

Con esto podemos usar el fragment sea donde sea que estos campos son requeridos.

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

> NOTA: El contenido del fragment tiene que encajar en el sitio que es usado.

## 7. Inline Fragments

Podemos utilizar los fragmentos en modo en línea.

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
        id,
        company,
        avatar_url
      }
    }
  }
}
```

## 8. Interface y Union

En GraphQL, podemos definir un tipo de grupo el cual puede ser tanto una _interface_ o una _union_ de múltiples tiops. Esto tipos son básicamente nos permiten combinar múltiples tipos en un único campo. ¿Pero por qué usarlos? A veces los objetos tienen diferentes tipos en función de cómo son usados.

Por ejemplo en unn esquema de base de datos un _person_ ouede ser tanto un _employee_ como un _vendor_. En GraphQL podemos modelar esta relación con un _interface_. Decimos que _PersonType_ es una _interface_, y ambos _EmployeeType_ y _VendorType_ implementan _PersonType interface_.

A veces un objeto puede ser representado por uno de dos tipos. Por ejemplo, el _author_ de un `commit` de un repo de Github puede ser un _user_ de la plataforma GitHub o un _guest_ que no posee un _username_ de GitHub. Pero ambos tipos representan un objeto _uthor_ En GraphQL podemos modelar esta realción con un tipo _union_, decimos que un _AuthorType_ es un _union_ de ambos un _Github User_, y de un _Guest Commit Author_

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

Para actualizar datos, usamos _mutations_

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

Todas las operaciones _mutation_ devuelven algo al cliente, en este caso por ejemplo _linkEdge_.
