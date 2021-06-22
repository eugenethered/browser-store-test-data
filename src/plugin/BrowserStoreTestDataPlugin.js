import fs from 'fs'
import path from 'path'
import { Compilation, sources } from 'webpack'

import { PLUGIN_NAME, TEST_BASE_URI, TEST_DATA_LOAD_URI } from '../core/constants'
import ConsoleLogger from '../core/logger/ConsoleLogger.js'

export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options || {}
        this.testLoaderScript = 'test-loader.js'
        this.testDataLoadUri = TEST_DATA_LOAD_URI
        this.testBaseUri = TEST_BASE_URI
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
                    const loaderScriptUri = `${this.testBaseUri}/${this.testLoaderScript}`
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
                    const browserDatabase = this.options.browserDatabase
                    const testDataConfig = this.options.testData

                    let testDataLoad = {
                        database: browserDatabase,
                        testData: []
                    }

                    testDataConfig.forEach(config => {
                        const testDataFile = config.dataFile
                        const copiedFileUri = this.copyTestDataFile(compiler, compilation, testDataFile)
                        this.logger.log(`COPIED test data file [${copiedFileUri}]`)

                        testDataLoad.testData.push({
                            collectionName: config.collectionName,
                            testDataUri: `/${copiedFileUri}`
                        })
                    })

                    const testDataLoadContent = JSON.stringify(testDataLoad, undefined, 2)
                    const testDataLoadFileUri = this.testDataLoadUri
                    const emittedAssetUri = this.emitAssetFile(compilation, testDataLoadContent, testDataLoadFileUri)
                    this.logger.log(`CREATED test data load [${emittedAssetUri}]`)
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
                    const loaderFile = `${this.testBaseUri}/${this.testLoaderScript}`

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
        return this.emitAssetFile(compilation, contents, fileUri)
    }

    emitAssetFile (compilation, contents, assetFileUri) {
        const webpackFileSource = new sources.RawSource(contents)
        compilation.emitAsset(assetFileUri, webpackFileSource)
        return assetFileUri
    }
}


