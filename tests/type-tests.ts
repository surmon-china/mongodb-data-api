/**
 * NOTE: This file is purely for testing types.
 * Therefore it doesn't export anything.
 */

import { MongoDBDataAPI } from '../src/index'

function assertType<T>(value: T): T {
  return value
}

interface Person {
  _id: string
  name: string
  age: number
}

interface Car {
  _id: string
  make: string
}

const api = new MongoDBDataAPI<Person>({ apiKey: '', appId: '' })

api
  .$collection<Car>('customers')
  .findOne({ filter: {} })
  .then((result) => assertType<{ document: Car | null }>(result))

api
  .findOne({ filter: { _id: '123' }, projection: {} })
  .then((result) => assertType<{ document: Person | null }>(result))

api
  .find({ filter: { age: { $gt: 30 } }, projection: { _id: 1 } })
  .then((result) => assertType<{ documents: Person[] }>(result))

api
  .insertOne({ document: { _id: '123', name: 'John', age: 30 } })
  .then((result) => assertType<{ insertedId: string }>(result))

api
  .insertMany({ documents: [{ _id: '123', name: 'John', age: 30 }] })
  .then((result) => assertType<{ insertedIds: string[] }>(result))

api
  .updateOne({ filter: { _id: '123' }, update: { $set: { name: 'John' } } })
  .then((result) =>
    assertType<{
      matchedCount: number
      modifiedCount: number
      upsertedId?: string
    }>(result)
  )

api
  .updateMany({ filter: { age: { $gt: 30 } }, update: { $set: { name: 'John' } } })
  .then((result) =>
    assertType<{
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
    assertType<{ matchedCount: number; modifiedCount: number; upsertedId?: string }>(
      result
    )
  )
