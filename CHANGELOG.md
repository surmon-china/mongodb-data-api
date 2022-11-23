# Changelog

All notable changes to this project will be documented in this file.

### v0.4.0 (2022-11-24)

**Breaking Change**

- API key desensitization is no longer processed when an error occurs.

### v0.3.0 (2022-11-24)

**Breaking Change**

- Upgrade axios to `1.x` ([Cannot find name 'ProgressEvent'](https://github.com/axios/axios/issues/5297))
- Upgrade mongodb to `4.12.x`
- Upgrade default url endpoint to [v1](https://www.mongodb.com/docs/atlas/api/data-api-resources/#base-url)
- Add `cloud` provider config
- Remove built-in `regions`

**Fix**

- [#6 `error.toJSON` is not a function](https://github.com/surmon-china/mongodb-data-api/issues/6)

**Chore**

- Upgrade deps

### v0.2.1 (2022-11-19)

**Fix**

- [#7 Fix the bug of aggregate url](https://github.com/surmon-china/mongodb-data-api/pull/7)

### v0.2.0 (2022-03-09)

**Feature**

- New creator function `createMongoDBDataAPI`

**Fix**

- [#3 Adjust typescript generics](https://github.com/surmon-china/mongodb-data-api/pull/3)
- [#4 Disable parameter inference](https://github.com/surmon-china/mongodb-data-api/pull/4)

### v0.1.0 (2022-01-31)

- Implements Beta API
