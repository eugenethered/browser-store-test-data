import chalk from 'chalk'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.name = 'browser-store-test-data-plugin'
        this.options = options
    }

    apply (compiler) {
        const pluginName = this.name
        const logger = compiler.getInfrastructureLogger(pluginName)

        compiler.hooks.beforeRun.tap(pluginName, (compiler) => {
            logger.log(chalk.green('loading test data before compilation'))
        })

        compiler.hooks.compilation.tap(pluginName, (compilation, compilationParams) => {
            logger.log(chalk.green('loading test during compilation'))
        })

        compiler.hooks.emit.tap(pluginName, (compilation) => {
            logger.log(chalk.green('hello... is it me you\'re looking for...'))
        })
    }
}
