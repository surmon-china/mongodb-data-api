import type { Document } from 'mongodb'
import { createMongoDBDataAPI, MongoDBDataAPI, Region } from '../src'
import {
  describe,
  expectError,
  expectType,
  expectAssignable,
  IsAny,
  IsUnion
} from './type'

interface FooString {
  foo: string
}

interface BarString {
  bar: string
}

describe('Class creator', () => {
  // @ts-expect-error
  expectError(new MongoDBDataAPI())
  // @ts-expect-error
  expectError(new MongoDBDataAPI({ apiKey: '', appId: '', urlEndpoint: '' }))
  // @ts-expect-error
  expectError(new MongoDBDataAPI({ apiKey: '', appId: '', region: '' }))

  // @ts-expect-error
  expectError(createMongoDBDataAPI())
  expectType<MongoDBDataAPI>(createMongoDBDataAPI({ apiKey: '', urlEndpoint: '' }))

  const api = new MongoDBDataAPI({ apiKey: '', urlEndpoint: '' })
  expectType<MongoDBDataAPI>(api)
  expectAssignable<MongoDBDataAPI>(api)

  const api2 = new MongoDBDataAPI({ apiKey: '', appId: '', region: Region.Virginia })
  expectType<MongoDBDataAPI>(api2)
  expectAssignable<MongoDBDataAPI>(api2)
})

describe('Class baseParams', async () => {
  const api = new MongoDBDataAPI<FooString>(
    { apiKey: '', appId: '' },
    { dataSource: '', database: '' }
  )
  const result = await api.findOne()
  expectType<IsAny<typeof result.document>>(false)
  expectType<FooString | null>(result.document)

  const result2 = await api.findOne({ filter: { id: '1' } })
  expectType<IsAny<typeof result2.document>>(false)
  expectType<FooString | null>(result2.document)

  const result3 = await api.findOne<BarString>({ filter: { id: '1' } })
  expectType<IsAny<typeof result3.document>>(false)
  expectType<BarString | null>(result3.document)
})

describe('action type', async () => {
  const api = createMongoDBDataAPI({ apiKey: '', appId: '' })
  const result = await api.findOne()
  expectType<IsAny<typeof result.document>>(false)
  expectType<IsUnion<typeof result.document>>(true)
  if (result.document) {
    expectType<Document>(result.document)
  }

  const result2 = await api.findOne<BarString>({
    dataSource: 'a',
    database: 'b',
    collection: 'c',
    filter: { name: 'Surmon' }
  })
  expectType<IsAny<typeof result2.document>>(false)
  expectType<IsUnion<typeof result2.document>>(true)
  expectType<BarString | null>(result2.document)

  const result3 = await api.findOne<FooString>()
  expectType<IsAny<typeof result3.document>>(false)
  expectType<FooString | null>(result3.document)

  const result4 = await api.findOne<FooString>({ filter: { bar: '' } })
  expectType<IsAny<typeof result4.document>>(false)
  expectType<FooString | null>(result4.document)
})

describe('method chaining', async () => {
  const api = createMongoDBDataAPI({ apiKey: '', appId: '' })
  const clusterA = api.$cluster('a')

  const databaseB = clusterA.$database('b')
  const databaseC = clusterA.$database('c')

  const resultB = await databaseB
    .$collection<FooString>('item')
    .findOne({ filter: { key: 'test' } })
  expectType<IsAny<typeof resultB.document>>(false)
  expectType<FooString | null>(resultB.document)

  const resultC = await databaseC
    .$collection<BarString>('item')
    .findOne<{ bar: string; foo: number }>({ filter: {} })
  expectType<IsAny<typeof resultC.document>>(false)
  if (resultC.document) {
    expectType<number>(resultC.document.foo)
    expectType<string>(resultC.document.bar)
  }
})

// https://github.com/surmon-china/mongodb-data-api/pull/3/files @maxfi
describe('actions', async () => {
  interface Person {
    _id: string
    name: string
    age: number
  }

  interface Car {
    _id: string
    make: string
  }

  const api = createMongoDBDataAPI({ apiKey: '', appId: '' })
  const docCollection = api.$collection('test')
  const carCollection = api.$collection<Car>('car')

  docCollection
    .findOne({ filter: { make: 'test' } })
    .then((result) => expectType<{ document: Document | null }>(result))

  carCollection
    .findOne({ filter: { make: 'test' } })
    .then((result) => expectType<{ document: Car | null }>(result))

  carCollection
    .findOne<Person>({ filter: { name: 'person' } })
    .then((result) => expectType<{ document: Person | null }>(result))

  api
    .findOne<Person>({ filter: { _id: '123' }, projection: {} })
    .then((result) => expectType<{ document: Person | null }>(result))

  api
    .find<Person>({ filter: { age: { $gt: 30 } }, projection: { _id: 1 } })
    .then((result) => expectType<{ documents: Person[] }>(result))

  api
    .insertOne({ document: { _id: '123', name: 'John', age: 30 } })
    .then((result) => expectType<{ insertedId: string }>(result))

  api
    .insertMany({ documents: [{ _id: '123', name: 'John', age: 30 }] })
    .then((result) => expectType<{ insertedIds: string[] }>(result))

  api
    .updateOne({ filter: { _id: '123' }, update: { $set: { name: 'John' } } })
    .then((result) =>
      expectType<{
        matchedCount: number
        modifiedCount: number
        upsertedId?: string
      }>(result)
    )

  api
    .updateMany({ filter: { age: { $gt: 30 } }, update: { $set: { name: 'John' } } })
    .then((result) =>
      expectType<{
        matchedCount: number
        modifiedCount: number
        upsertedId?: string
      }>(result)
    )

  api
    .replaceOne({
      filter: { _id: '123' },
      replacement: { _id: '123', name: 'John', age: 30 }
    })
    .then((result) =>
      expectType<{ matchedCount: number; modifiedCount: number; upsertedId?: string }>(
        result
      )
    )
})
