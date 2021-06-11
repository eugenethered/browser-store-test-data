import chalk from 'chalk'
import { PLUGIN_NAME } from 'config/constants'
import TestDataBrowserDBProvider from './provider/TestDataBrowserDBProvider'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options
    }

    apply (compiler) {
        compiler.hooks.emit.tapPromise(PLUGIN_NAME, (compilation) => {
            return new Promise((resolve, reject) => {
                console.log(chalk.green(`${PLUGIN_NAME}: loading test data...`))

                const browserDatabase = this.options.browserDatabase
                const testData = this.options.testData
                const provider = new TestDataBrowserDBProvider(browserDatabase)

                resolve(provider.injectTestData(testData))
            })
        })
    }
}
