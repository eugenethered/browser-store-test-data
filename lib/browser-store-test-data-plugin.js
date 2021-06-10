import BrowserDBProvider from './provder/BrowserDBProvider';

export default class BrowserStoreTestDataPlugin {
  constructor (options) {
    this.options = options;
  }

  async apply (compiler) {
    const database = this.options.database;
    const browserDBProvider = new BrowserDBProvider(database);
    const testData = this.options.testData;

    for (const testDataItem of testData) {
      const testDataDir = testDataItem.path;
      const collection = testDataItem.collection;
      await browserDBProvider.loadDBTestData(collection, testDataDir);
    }

    console.log('BrowserStoreTestDataPlugin PLUGIN is loaded');
  }
}
