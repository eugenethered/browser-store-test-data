import Localbase from 'localbase'

import BrowserLogger from '../../core/logger/BrowserLogger'

class TestDataBrowserDBProvider {

    constructor() {
        this.logger = new BrowserLogger()
    }

    initialize = (testDataLoadUri) => {
        (async () => {
            const load = await this.fetchUriResource(testDataLoadUri)
            this.logger.log(`initializing using test load [${testDataLoadUri}]`)

            const database = load.database
            this.logger.log(`database to load test data [${database}]`)
            this.initDatabase(database)

            const testData = load.testData
            this.logger.log(`test data to load count [${testData.length}]`)
            await this.injectTestData(testData)
        })()
    }

    initDatabase = (browserDatabase) => {
        if (!this.localBrowserDatabase) {
            this.localBrowserDatabase = new Localbase(browserDatabase)
            this.localBrowserDatabase.config.debug = false
        }
    }

    injectTestData = async (testData) => {
        for await (let testDataToInject of testData) {
            const collectionName = testDataToInject.collectionName
            const testDataUri = testDataToInject.testDataUri
            await this.loadDBTestData(collectionName, testDataUri)
        }
    }

    loadDBTestData = async (collectionName, testDataUri) => {
        const isDataAlreadyLoaded = await this.isDataStored(collectionName)

        if(isDataAlreadyLoaded) {
            this.logger.log(`collection [${collectionName}] already has data loaded (should you need to override, clear the collection in your browser)`)
            return
        }

        const testData = await this.fetchUriResource(testDataUri)
        await this.storeAll(collectionName, testData)
        this.logger.log(`loaded data [${testData.length}] from [${testDataUri}] into collection [${collectionName}]`)
    }

    fetchUriResource = async (uri) => {
        const response = await fetch(uri)
        return await response.json()
    }

    isDataStored = async (collectionName) => {
        const result = await this.collection(collectionName).limit(1).get()
        return (result !== null && result.length > 0)
    }

    storeAll = async (collectionName, data) => {
        await this.collection(collectionName).set(data)
    }

    collection = (collectionName) => {
        return this.localBrowserDatabase.collection(collectionName)
    }
}

export default TestDataBrowserDBProvider