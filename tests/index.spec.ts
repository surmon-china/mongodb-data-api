import { MongoDBDataAPI } from '../src'

test('<type> should be function type', () => {
  const hooksTargetType = 'function'
  expect(typeof MongoDBDataAPI).toBe(hooksTargetType)

  const mdaInstance = new MongoDBDataAPI({ apiKey: 'test_key', appId: '' })
  expect(typeof mdaInstance.$$action).toBe(hooksTargetType)
  expect(typeof mdaInstance.$cluster).toBe(hooksTargetType)
  expect(typeof mdaInstance.$database).toBe(hooksTargetType)
  expect(typeof mdaInstance.$collection).toBe(hooksTargetType)
})

test('<config> should not be empty params', () => {
  const logs = []
  try {
    new MongoDBDataAPI({ apiKey: null as unknown as string, urlEndpoint: '' })
  } catch (error) {
    logs.push(error)
  }
  expect(logs.length).toBe(1)
})
