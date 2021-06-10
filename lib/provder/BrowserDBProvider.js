import fs from 'fs';
import Localbase from 'localbase';

class BrowserDBProvider {
  constructor (dbName) {
    this.initDatabase(dbName);
  }

  initDatabase (dbName) {
    if (!this.localBrowserDatabase) {
      this.localBrowserDatabase = new Localbase(dbName);
      this.localBrowserDatabase.config.debug = false;
    }
  }

  collection (collectionName) {
    return this.localBrowserDatabase.collection(collectionName);
  }

  async storeAll (collectionName, data) {
    await this.collection(collectionName).set(data);
  }

  async loadDBTestData (collectionKey, testDataFile) {
    const isDataAlreadyLoaded = await this.isKeyStored(collectionKey);

    if (!isDataAlreadyLoaded) {
      const fileContents = await this.readDataFromFile(testDataFile);
      const json = await fileContents.json();
      await this.storeAll(collectionKey, json);
    }
  }

  async readDataFromFile (testDataFile) {
    fs.readFile(testDataFile, (err, data) => {
      if (err) throw err;
      return data;
    });
  }

  async isKeyStored (collectionName) {
    const result = await this.collection(collectionName).limit(1).get();
    return (result !== null && result.length > 0);
  }
}

export default BrowserDBProvider;
