import fs from 'fs'
import { Compilation, sources } from 'webpack'

import { PLUGIN_NAME } from '../core/constants'
import ConsoleLogger from '../core/logger/ConsoleLogger.js'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options || {}
        this.testLoaderFile = 'test-loader.js'
        this.testPublicPath = 'test'
    }

    apply (compiler) {
        this.logger = new ConsoleLogger(compiler.getInfrastructureLogger(PLUGIN_NAME))

        this.addTestLoader(compiler)
        this.injectTestLoader(compiler)
        this.reportEmittedAssets(compiler)
    }

    addTestLoader (compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: PLUGIN_NAME,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
                },
                () => {
                    const publicLoaderFile = `${this.testPublicPath}/${this.testLoaderFile}`
                    const loaderFilePath = require.resolve('../loader/loader.bundle.js')

                    this.logger.log(`ADDED loader [${publicLoaderFile}]`)

                    const contents = fs.readFileSync(loaderFilePath)
                    const webpackFileSource = new sources.RawSource(contents)
                    compilation.emitAsset(publicLoaderFile, webpackFileSource)
                }
            )
        })
    }

    injectTestLoader (compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: PLUGIN_NAME,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                (assets) => {
                    const publicPath = compilation.outputOptions.publicPath
                    const loaderFile = `${this.testPublicPath}/${this.testLoaderFile}`

                    Object.entries(assets).forEach(([pathname, source]) => {
                        if(pathname === 'index.html') {
                            const htmlPortionToUpdate = '<script'
                            const htmlUpdate = `<script src="${publicPath}${loaderFile}"></script>${htmlPortionToUpdate}`

                            const fileContent = source.source().replace(htmlPortionToUpdate, htmlUpdate)

                            const webpackFileSource = new sources.RawSource(fileContent)
                            compilation.updateAsset('index.html', webpackFileSource)
                        }
                    })
                }
            )
        })
    }

    reportEmittedAssets (compiler) {
        compiler.hooks.assetEmitted.tap(
            PLUGIN_NAME,
            (file, { content, source, outputPath, compilation, targetPath }) => {
                this.logger.log(`EMITTED [${file}]`)
            }
        )
    }
}


