![npm](https://img.shields.io/npm/v/browser-store-test-data)
[![dependencies Status](https://status.david-dm.org/gh/eugene-the-red/browser-store-test-data.svg)](https://david-dm.org/eugene-the-red/browser-store-test-data)
[![install size](https://packagephobia.com/badge?p=browser-store-test-data)](https://packagephobia.com/result?p=browser-store-test-data)
![GitHub issues](https://img.shields.io/github/issues/eugene-the-red/browser-store-test-data)

# Browser Store Test Data
A simple way to load test data for the browser store. Supports IndexDB.

## Index
- [Installation](#installation)
- [Usage](#usage)
  - [Webpack Plugin Usage](#webpack-plugin-usage)
- [Development](#development)

### Installation
```shell
# Using npm, installing to local project (development)
npm install --save-dev browser-store-test-data
```

### Usage
The main intended method to use this in your project via webpack plugin.

### Webpack Plugin Usage
```js
// load the library and add to plugins section with options
const BrowserStoreTestDataPlugin = require('browser-store-test-data')

plugins: [
    new BrowserStoreTestDataPlugin(
      {
        browserDatabase: '[browser-database-name]',
        testData: [
          {
              collectionName: 'collection-name',
              filePath: 'path/to/file(s)/dir'
          }
        ]
      }
    )    
]    
```

### Development
See the specific [development guide](guides/dev-guide.md).

### License
(Unlicense) See https://unlicense.org
