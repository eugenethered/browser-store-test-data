import fs from 'fs'
import { Compilation, sources } from 'webpack'
import chalk from 'chalk'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.name = 'browser-store-test-data-plugin'
        this.options = options || {}

        this.testLoaderFile = 'test-loader.js'
        this.testPublicPath = 'test'
    }

    apply (compiler) {
        this.logger = compiler.getInfrastructureLogger(this.name)
        this.addTestLoader(compiler)
        this.injectTestLoader(compiler)
    }

    addTestLoader (compiler) {
        const pluginName = this.name
        const logger = this.logger

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
                },
                () => {
                    const publicLoaderFile = `${this.testPublicPath}/${this.testLoaderFile}`
                    const loaderFilePath = require.resolve('./loader/index.js')

                    logger.log(chalk.green(`added loader file:[${publicLoaderFile}]`))

                    const contents = fs.readFileSync(loaderFilePath)
                    const webpackFileSource = new sources.RawSource(contents)
                    compilation.emitAsset(publicLoaderFile, webpackFileSource)
                }
            )
        })
    }

    injectTestLoader (compiler) {
        const pluginName = this.name

        compiler.hooks.compilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    const publicPath = compilation.outputOptions.publicPath
                    const loaderFile = `${this.testPublicPath}/${this.testLoaderFile}`

                    Object.entries(assets).forEach(([pathname, source]) => {
                        if(pathname === 'index.html') {
                            const htmlPortionToUpdate = '<script'
                            const htmlUpdate = `<script defer src="${publicPath}${loaderFile}"></script>${htmlPortionToUpdate}`

                            const fileContent = source.source().replace(htmlPortionToUpdate, htmlUpdate)

                            const webpackFileSource = new sources.RawSource(fileContent)
                            compilation.updateAsset('index.html', webpackFileSource)
                        }
                    })
                }
            )
        })
    }
}


