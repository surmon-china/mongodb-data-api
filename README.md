<p align="center">
  <img src="/logo.svg" height="120px" />
</p>

# mongodb-data-api

MongoDB Atlas [Data API](https://docs.atlas.mongodb.com/api/data-api/) SDK for Node.js.

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
import { MongoDBDataAPI, Region } from 'mongodb-data-api'

// init by URL Endpoint
const api = new MongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  urlEndpoint: 'https://data.mongodb-api.com/app/<your_mongodb_app_id>/endpoint/data/beta'
})

// or init by app ID
const api = new MongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  appId: '<your_mongodb_app_id>'
})

// specific region of app
const api = new MongoDBDataAPI({
  apiKey: '<your_mongodb_api_key>',
  appId: '<your_mongodb_app_id>',
  region: Region.Virginia
})
```

#### Actions

See [MongoDB Data API Resources](https://docs.atlas.mongodb.com/api/data-api-resources/).

- [`api.findOne`](https://docs.atlas.mongodb.com/api/data-api-resources/#find-a-single-document)
- [`api.find`](https://docs.atlas.mongodb.com/api/data-api-resources/#find-multiple-documents)
- [`api.insertOne`](https://docs.atlas.mongodb.com/api/data-api-resources/#insert-a-single-document)
- [`api.insertMany`](https://docs.atlas.mongodb.com/api/data-api-resources/#insert-multiple-documents)
- [`api.updateOne`](https://docs.atlas.mongodb.com/api/data-api-resources/#update-a-single-document)
- [`api.updateMany`](https://docs.atlas.mongodb.com/api/data-api-resources/#update-multiple-documents)
- [`api.replaceOne`](https://docs.atlas.mongodb.com/api/data-api-resources/#replace-a-single-document)
- [`api.deleteOne`](https://docs.atlas.mongodb.com/api/data-api-resources/#delete-a-single-document)
- [`api.deleteMany`](https://docs.atlas.mongodb.com/api/data-api-resources/#delete-multiple-documents)
- [`api.aggregate`](https://docs.atlas.mongodb.com/api/data-api-resources/#run-an-aggregation-pipeline)

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
// api.$cluster
const clusterA = api.$cluster('a')

// api.$cluster.$database
const databaseB = clusterA.$database('b')
const databaseC = clusterA.$database('c')

// api.$cluster.$database.$collection
const bItemCollection = databaseB.$collection('item')
const cItemCollection = databaseC.$collection('item')

// actions
bItemCollection.findOne({ filter: {/*...*/} })
cItemCollection.insertOne({ document: {/*...*/} })

// -------------

// chaining is equivalent to the api call
api.$cluster('a').$database('b').$collection('c').findOne({ filter: {} })
// the same as
api.findOne({
  dataSource: 'a',
  database: 'b',
  collection: 'c',
  filter: {}
})
```

#### Specific Action

You can specific the action request to prevent this package from lagging relative to the official one.

```ts
api.$$action('findOne', {
  dataSource: '...',
  database: '...',
  collection: '...',
  filter: {}
})
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

Detailed changes for each release are documented in the [release notes](https://github.com/surmon-china/mongodb-data-api/blob/master/CHANGELOG.md).

### License

[MIT](https://github.com/surmon-china/mongodb-data-api/blob/master/LICENSE)
