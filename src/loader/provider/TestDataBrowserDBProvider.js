import chalk from 'chalk'

//todo: referencing this is an issue (webpack -> dep -> dep EMScript)
import Localbase from 'localbase'

class TestDataBrowserDBProvider {

    constructor(browserDatabase) {
        this.initDatabase(browserDatabase)
    }

    initDatabase = (browserDatabase) => {
        if (!this.localBrowserDatabase) {
            this.localBrowserDatabase = new Localbase(browserDatabase)
            this.localBrowserDatabase.config.debug = false
        }
    }

    injectTestData = async (testData) => {
        for (const testDataToInject in testData) {
            const collectionName = testDataToInject.collectionName
            const filePath = testDataToInject.filePath
            await this.loadDBTestData(collectionName, filePath)
        }
    }

    loadDBTestData = async (collectionName, testDataFile) => {
        const isDataAlreadyLoaded = await this.isDataStored(collectionName)

        if(!isDataAlreadyLoaded) {
            const response = await fetch(testDataFile)
            const json = await response.json()
            await this.storeAll(collectionName, json)
            //todo: get access to the appropriate logger
            console.log(chalk.green(`loaded data from [${testDataFile}] into collection [${collectionName}]`))
        }
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