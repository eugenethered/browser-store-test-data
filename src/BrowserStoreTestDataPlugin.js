export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options
    }

    apply (compiler) {
        const optionsProvided = JSON.stringify(this.options)
        console.log('BrowserStoreTestDataPlugin PLUGIN is loaded, options:' + optionsProvided)
    }
}
