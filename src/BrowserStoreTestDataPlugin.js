import chalk from 'chalk'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options
    }

    apply (compiler) {
        const PLUGIN_NAME = 'browser-store-test-data-plugin'
        const logger = compiler.getInfrastructureLogger(PLUGIN_NAME)

        compiler.hooks.beforeRun.tap(PLUGIN_NAME, (compiler) => {
            logger.log(chalk.green(`${PLUGIN_NAME}: loading test data before compilation`))
        })

        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, compilationParams) => {
            logger.log(chalk.green(`${PLUGIN_NAME}: loading test during compilation`))
        })

        compiler.hooks.emit.tap(PLUGIN_NAME, (compilation) => {
            logger.log(chalk.green(`${PLUGIN_NAME}: hello... is it me you're looking for...`))
        })
    }
}
