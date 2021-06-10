# Browser Store Test Data
A simple way to load test data for the browser store. Supports IndexDB.

# Index
- [Installation](#installation)
- [Usage](#usage)
  - [Webpack Plugin Usage](#webpack-plugin-usage)
- [Development](#development)

## Installation
```shell
# Using npm, installing to local project (development)
npm install --save-dev browser-store-test-data
```

## Usage
The main intended method to use this in your project via webpack plugin.

### Webpack Plugin Usage
```js
// load the library and add to plugins section with options
const BrowserStoreTestDataPlugin = require('browser-store-stest-data-plugin')

plugins: [
    new BrowserStoreTestDataPlugin({
      database: 'db-name',
      testData: [
        {
          path: 'path/to/file(s)/dir',
          collection: 'collection-name'
        }
      ]
    })    
]    
```

## Development
See the specific [development guide](guides/dev-guide.md).

## License
(Unlicense) See https://unlicense.org