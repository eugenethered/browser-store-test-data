import fs from 'fs'
import path from 'path'
import { Compilation, sources } from 'webpack'

import { PLUGIN_NAME } from '../core/constants'
import ConsoleLogger from '../core/logger/ConsoleLogger.js'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options || {}
        this.testLoaderFile = 'test-loader.js'
        this.testBaseUri = 'test'
        this.testDataUri = `${this.testBaseUri}/data`
    }

    apply (compiler) {
        this.logger = new ConsoleLogger(compiler.getInfrastructureLogger(PLUGIN_NAME))
        this.addTestLoader(compiler)
        this.injectTestLoader(compiler)
        this.copyTestDataFilesAndCreateLoad(compiler)
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
                    const loaderScriptUri = `${this.testBaseUri}/${this.testLoaderFile}`
                    const loaderFileAbsolutePath = require.resolve('../loader/loader.bundle.js')
                    const emittedAssetUri = this.emitFileAsAsset(compilation, loaderFileAbsolutePath, loaderScriptUri)
                    this.logger.log(`ADDED loader [${emittedAssetUri}]`)
                }
            )
        })
    }

    copyTestDataFilesAndCreateLoad (compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: PLUGIN_NAME,
                    stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
                },
                (assets) => {
                    const testDataConfig = this.options.testData
                    testDataConfig.forEach(config => {
                        const testDataFile = config.dataFile
                        const copiedFileUri = this.copyTestDataFile(compiler, compilation, testDataFile)
                        this.logger.log(`COPIED test data file [${copiedFileUri}]`)
                    })

                    //todo: create load file
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
                    const loaderFile = `${this.testBaseUri}/${this.testLoaderFile}`

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

    copyTestDataFile (compiler, compilation, testDataFilePath) {
        const contextPath = compiler.context
        const absoluteTestDataFilePath = path.join(contextPath, testDataFilePath)

        const testDataAssetFileName = path.basename(absoluteTestDataFilePath)
        const testDataAssetUri = `${this.testDataUri}/${testDataAssetFileName}`

        return this.emitFileAsAsset(compilation, absoluteTestDataFilePath, testDataAssetUri)
    }

    emitFileAsAsset (compilation, absoluteFilePath, fileUri) {
        const contents = fs.readFileSync(absoluteFilePath)
        const webpackFileSource = new sources.RawSource(contents)
        compilation.emitAsset(fileUri, webpackFileSource)
        return fileUri
    }
}


