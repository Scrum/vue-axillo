# vue-axillo 
> Composable [Axios](https://github.com/axios/axios) for [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API with query notation [GraphQL](https://graphql.org/)

[![Actions Status](https://github.com/Scrum/vue-axillo/workflows/Actions%20Status/badge.svg?style=flat-square)](https://github.com/Scrum/vue-axillo/actions?query=workflow%3A%22CI+tests%22)[![node](https://img.shields.io/node/v/vue-axillo.svg?style=flat-square)]()[![npm version](https://img.shields.io/npm/v/vue-axillo.svg?style=flat-square)](https://www.npmjs.com/package/vue-axillo)[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/xojs/xo)[![Coveralls status](https://img.shields.io/coveralls/Scrum/vue-axillo.svg?style=flat-square)](https://coveralls.io/r/Scrum/vue-axillo)

[![npm downloads](https://img.shields.io/npm/dm/vue-axillo.svg?style=flat-square)](https://www.npmjs.com/package/vue-axillo)[![npm](https://img.shields.io/npm/dt/vue-axillo.svg?style=flat-square)](https://www.npmjs.com/package/vue-axillo)

## Why?
Axillo is a set of tools effort to help you use [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API in your apps. It's well known for its client and its server.

All queries use [rexios](https://github.com/Scrum/rexios) utils normalize url, data, params for axios when using [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API request

## Install

```bash
$ npm install vue-axillo
```

> **Note:** This project is compatible with node v10+

## Usage

### Query

> For `query` requests the `get` method is used by default

```js
import axillo  from 'vue-axillo';

export default {
  setup() {
    const { 
      query,        // query method
      loading,      // request status
      result: users // reactive data
    } = axillo({
      baseURL: 'v2/api/user/'
    });

    async function submit() {
      await query(/* params */); // => request on 'v2/api/user/'
    }

    return {
      submit,
      loading,
      users,
    }
  }
}
```

### Query with params
```js
import axillo  from 'vue-axillo';

export default {
  setup() {
    const { 
      query,        // query method
      loading,      // request status
      result: users // reactive data
    } = axillo({
      baseURL: 'v2/api/user/'
    });

    async function submit() {
      await query({
        id: 123,
        article: 1,
      }); // => request on 'v2/api/user/123/?article=1'
    }

    return {
      submit,
      loading,
      users,
    }
  }
}
```

### Query with reactive params
```js
import axillo  from 'vue-axillo';
import { ref, watch } from 'vue' // vue 3 or composition-api

export default {
  setup() {
    const name = ref(null);
    const { 
      params: searchByName, // params for query
      loading,              // request status
      result: users         // reactive data
    } = axillo({
      baseURL: 'v2/api/user/'
    });

    watch(name, value => {
      searchByName.value = value;
    });

    return {
      loading,
      users,
    }
  }
}
```

### Mutate

> For `mutate` requests the `post` method is used by default

```js
import axillo  from 'vue-axillo';

export default {
  setup() {
    const { 
      mutate,   // mutate method
      loading,  // request status
      onDone,   // suceess callback
      onError,  // error callback
    } = axillo({
      baseURL: 'v2/api/user/'
    });

    function submit() {
      mutate({
        name: 'Scrum'
      });
    }

    onDone(response) {
      console.log(`User ${response.name} created.`);
    }

    return {
      submit,
      loading,
    }
  }
}
```

## Options

#### `baseURL`

Type: `String` **`required`**  
Default: `null`  
Description: *URL api used at `query` `mutation`*

#### `method`

Type: `String`  
Default: `get|post`  
Description: *for `query` requests the `get` method is used by default, for `mutate` requests the `post` method is used by default*

#### `apiClient`

Type: `Function`  
Default: [Axios](https://github.com/axios/axios)  
Description: *HTTP client*
