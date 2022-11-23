<p align="center">
  <img src="/logo.png" height="120px" />
</p>

# mongodb-data-api

[![GitHub stars](https://img.shields.io/github/stars/surmon-china/mongodb-data-api.svg?style=for-the-badge)](https://github.com/surmon-china/mongodb-data-api/stargazers)
&nbsp;
[![npm](https://img.shields.io/npm/v/mongodb-data-api?color=c7343a&label=npm&style=for-the-badge)](https://www.npmjs.com/package/mongodb-data-api)
&nbsp;
[![Test Codecov](https://img.shields.io/codecov/c/github/surmon-china/mongodb-data-api?style=for-the-badge)](https://codecov.io/gh/surmon-china/mongodb-data-api)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/mongodb-data-api.svg?style=for-the-badge)](/LICENSE)

MongoDB Atlas [Data API](https://www.mongodb.com/docs/atlas/api/data-api/) SDK for Node.js.

---

### Installation

```bash
npm install mongodb-data-api --save
```

or

```bash
yarn add mongodb-data-api
```

### Usage

#### Init

```ts
import { createMongoDBDataAPI } from 'mongodb-data-api'

// init by URL Endpoint
const api = createMongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  urlEndpoint: 'https://data.mongodb-api.com/app/<your_mongodb_app_id>/endpoint/data/v1'
})

// or init by app ID
const api = createMongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  appId: '<your_mongodb_app_id>'
})

// specific region and cloud of app
const api = createMongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  appId: '<your_mongodb_app_id>',
  region: '<your_mongodb_app_region>', // e.g. us-east-1
  cloud: '<your_mongodb_app_cloud>' // e.g. aws
})
```

#### Actions

See [MongoDB Data API Resources](https://www.mongodb.com/docs/atlas/api/data-api-resources/).

- [`API.findOne`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#find-a-single-document)
- [`API.find`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#find-multiple-documents)
- [`API.insertOne`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#insert-a-single-document)
- [`API.insertMany`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#insert-multiple-documents)
- [`API.updateOne`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#update-a-single-document)
- [`API.updateMany`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#update-multiple-documents)
- [`API.replaceOne`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#replace-a-single-document)
- [`API.deleteOne`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#delete-a-single-document)
- [`API.deleteMany`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#delete-multiple-documents)
- [`API.aggregate`](https://www.mongodb.com/docs/atlas/api/data-api-resources/#run-an-aggregation-pipeline)

#### Action examples

1. find a single document

```ts
api
  .findOne({
    dataSource: '<target_cluster_name>',
    database: '<target_database_name>',
    collection: '<target_collection_name>',
    filter: { name: 'Surmon' }
  })
  .then((result) => {
    console.log(result.document)
  })
```

2. insert a single document

```ts
api
  .insertOne({
    dataSource: '<target_cluster_name>',
    database: '<target_database_name>',
    collection: '<target_collection_name>',
    document: {
      name: 'Surmon',
      age: 19
    }
  })
  .then((result) => {
    console.log(result.insertedId)
  })
```

3. run an aggregation pipeline

```ts
api
  .aggregate({
    dataSource: '<target_cluster_name>',
    database: '<target_database_name>',
    collection: '<target_collection_name>',
    pipeline: [
      { $match: { status: 'urgent' } },
      { $group: { _id: '$productName', sumQuantity: { $sum: '$quantity' } } }
    ]
  })
  .then((result) => {
    console.log(result.documents)
  })
```

#### Method chaining

```ts
// select cluster
const clusterA = api.$cluster('a')
// select database
const databaseB = clusterA.$database('b')
// select collection
const collectionC = databaseB.$collection<C>('c')
// data actions
const data = await collectionC.findOne({
  filter: {
    /*...*/
  }
})
const result = await collectionC.insertOne({
  document: {
    /*...*/
  }
})

// -------------

// chaining is equivalent to the api call
api.$cluster('a').$database('b').$collection<C>('c').findOne({ filter: {} })
// the same as
api.findOne<C>({
  dataSource: 'a',
  database: 'b',
  collection: 'c',
  filter: {}
})
```

#### Specific Action

You can specify the action request to prevent this package from lagging relative to the official one.

```ts
api.$$action('findOne', {
  dataSource: '...',
  database: '...',
  collection: '...',
  filter: {}
})
```

#### Original Class

You can use the original Class to implement some special requirements.

```ts
import { MongoDBDataAPI } from 'mongodb-data-api'

const customerCollection = new MongoDBDataAPI<CustomerDocument>(
  {
    apiKey: '<your_mongodb_api_key>',
    appId: '<your_mongodb_app_id>'
  },
  {
    dataSource: '<target_cluster_name>',
    database: '<target_database_name>',
    collection: '<target_collection_name>'
  }
)

const customer = await customerCollection.findOne({ ... })
```

### Development

```bash
# install dependencies
yarn

# lint
yarn lint

# test
yarn test

# build
yarn build
```

### Changelog

Detailed changes for each release are documented in the [release notes](/CHANGELOG.md).

### License

[MIT](/LICENSE)
