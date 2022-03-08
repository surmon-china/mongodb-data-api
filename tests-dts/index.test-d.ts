import { MongoDBDataAPI, Region } from '../src'
import {
  describe,
  expectError,
  expectType,
  expectAssignable,
  IsAny,
  IsUnion
} from './type'

describe('class config', () => {
  // @ts-expect-error
  expectError(new MongoDBDataAPI())
  // @ts-expect-error
  expectError(new MongoDBDataAPI({ apiKey: '', appId: '', urlEndpoint: '' }))
  // @ts-expect-error
  expectError(new MongoDBDataAPI({ apiKey: '', appId: '', region: '' }))

  const api = new MongoDBDataAPI({ apiKey: '', urlEndpoint: '' })
  expectType<MongoDBDataAPI>(api)
  expectAssignable<MongoDBDataAPI>(api)

  const api2 = new MongoDBDataAPI({ apiKey: '', appId: '' })
  expectType<MongoDBDataAPI>(api2)
  expectAssignable<MongoDBDataAPI>(api2)

  const api3 = new MongoDBDataAPI({ apiKey: '', appId: '', region: Region.Virginia })
  expectType<MongoDBDataAPI>(api3)
  expectAssignable<MongoDBDataAPI>(api3)
})

describe('action type', async () => {
  const api = new MongoDBDataAPI({ apiKey: '', appId: '' })
  const result = await api.findOne()
  expectType<IsAny<typeof result.document>>(true)

  const result2 = await api.findOne<{ foo: string }>({
    dataSource: 'a',
    database: 'b',
    collection: 'c',
    filter: {}
  })
  expectType<IsAny<typeof result2.document>>(false)
  expectType<IsUnion<typeof result2.document>>(true)

  const result3 = await api.findOne<{ foo: string }>()
  expectType<IsAny<typeof result3.document>>(false)
  expectType<{ foo: string } | null>(result3.document)

  const result4 = await api.findOne<{ foo: string }>({ filter: { bar: '' } })
  expectType<IsAny<typeof result4.document>>(false)
  expectType<{ foo: string } | null>(result4.document)
})

describe('class base params', async () => {
  const api = new MongoDBDataAPI<{ foo: string }>(
    { apiKey: '', appId: '' },
    { dataSource: '', database: '' }
  )
  const result = await api.findOne()
  expectType<IsAny<typeof result.document>>(false)
  expectType<{ foo: string } | null>(result.document)

  const result2 = await api.findOne({ filter: { id: '1' } })
  expectType<IsAny<typeof result2.document>>(false)
  expectType<{ foo: string } | null>(result2.document)

  // @ts-expect-error
  expectError(await api.findOne<{ bar: string }>())

  const result3 = await api.findOne<{ foo: string; bar: string }>({ filter: { id: '1' } })
  expectType<IsAny<typeof result3.document>>(false)
  expectType<{ foo: string } | null>(result3.document)
})

describe('method chaining', async () => {
  const api = new MongoDBDataAPI({ apiKey: '', appId: '' })
  const clusterA = api.$cluster('a')

  const databaseB = clusterA.$database('b')
  const databaseC = clusterA.$database('c')

  const collectionB = databaseB.$collection<{ foo: string }>('item')
  const collectionC = databaseC.$collection<{ bar: string }>('item')

  const resultB = await collectionB.findOne({ filter: {} })
  expectType<IsAny<typeof resultB.document>>(false)
  expectType<{ foo: string } | null>(resultB.document)

  // @ts-expect-error
  expectError(await collectionC.findOne<{ bar: number }>({ filter: {} }))

  const resultC = await collectionC.findOne<{ bar: string; foo: number }>({ filter: {} })
  expectType<IsAny<typeof resultC.document>>(false)
  expectType<number>(resultC.document.foo)
  expectType<string>(resultC.document.bar)
})
