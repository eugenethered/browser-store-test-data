![npm](https://img.shields.io/npm/v/browser-store-test-data)
[![dependencies Status](https://status.david-dm.org/gh/eugene-the-red/browser-store-test-data.svg)](https://david-dm.org/eugene-the-red/browser-store-test-data)
[![install size](https://packagephobia.com/badge?p=browser-store-test-data)](https://packagephobia.com/result?p=browser-store-test-data)
![GitHub issues](https://img.shields.io/github/issues/eugene-the-red/browser-store-test-data)

# Browser Store Test Data
A simple way to load test data into the browser store. Supports [IndexedDB](https://www.w3.org/TR/IndexedDB/).

Essentially when developing, you provide a file with some test data.
This test data is loaded into the browser store & ready before your application runs. 
Your application then runs & reads test data from the browser store.

## Index
- [Installation](#installation)
- [Usage](#usage)
  - [Webpack Plugin Usage](#webpack-plugin-usage)
- [Development](#development)

### Installation
```shell
# Using npm, installing to local project (development)
npm i -D browser-store-test-data
```

### Usage
The main intended method to use this in your project via webpack plugin.

### Webpack Plugin Usage
```js
// load the library & add to plugins section with otions. Specify test data file(s) 
const BrowserStoreTestDataPlugin = require('browser-store-test-data')

plugins: [
    new BrowserStoreTestDataPlugin(
      {
        browserDatabase: '[browser-database-name]',
        testData: [
          {
              collectionName: 'collection-name',
              dataFile: '.path/to/file/dir'
          }
        ]
      }
    )    
]    
```

### License
(Unlicense) See https://unlicense.org
