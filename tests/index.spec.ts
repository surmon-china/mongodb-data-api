import axios from 'axios'
import { createMongoDBDataAPI, MongoDBDataAPI } from '../src'

test('<type> should be function type', () => {
  const hooksTargetType = 'function'
  expect(typeof MongoDBDataAPI).toBe(hooksTargetType)

  const apiInstance1 = createMongoDBDataAPI({ apiKey: 'test_key', appId: '' })
  expect(typeof apiInstance1.$$action).toBe(hooksTargetType)
  expect(typeof apiInstance1.$cluster).toBe(hooksTargetType)
  expect(typeof apiInstance1.$database).toBe(hooksTargetType)
  expect(typeof apiInstance1.$collection).toBe(hooksTargetType)

  const apiInstance2 = new MongoDBDataAPI({ apiKey: 'test_key', appId: '' })
  expect(typeof apiInstance2.$$action).toBe(hooksTargetType)
  expect(typeof apiInstance2.$cluster).toBe(hooksTargetType)
  expect(typeof apiInstance2.$database).toBe(hooksTargetType)
  expect(typeof apiInstance2.$collection).toBe(hooksTargetType)
})

test('<config> should not be empty params', () => {
  const logs: any[] = []

  try {
    new MongoDBDataAPI({ apiKey: null as unknown as string, urlEndpoint: '' })
  } catch (error) {
    logs.push(error)
  }

  try {
    createMongoDBDataAPI({ apiKey: null as unknown as string, urlEndpoint: '' })
  } catch (error) {
    logs.push(error)
  }

  expect(logs.length).toBe(2)
})

test('<action> should be valid params', async () => {
  const logs: any[] = []

  try {
    const api = createMongoDBDataAPI({ apiKey: 'test_key', urlEndpoint: '' })
    await api.$$action('test')
  } catch (error) {
    logs.push(error)
  }

  expect(logs.length).toBe(1)
})

test('<runtime> should be error', async () => {
  try {
    const api = createMongoDBDataAPI({
      apiKey: 'test_api_key',
      urlEndpoint: 'test_url_endpoint'
    })
    await api.$cluster('test').$database('test').$collection('test').find()
  } catch (error) {
    expect(axios.isAxiosError(error)).toBeFalsy()
  }
})

test('<runtime> should be axios error', async () => {
  try {
    const api = createMongoDBDataAPI({
      apiKey: 'test_api_key',
      urlEndpoint: 'https://data.mongodb-api.com/app/test_app/endpoint/data/v1'
    })
    await api.$cluster('test').$database('test').$collection('test').findOne()
  } catch (error: any) {
    expect(error.name).toBe('AxiosError')
    expect(error.status).toBe(404)
  }
})
