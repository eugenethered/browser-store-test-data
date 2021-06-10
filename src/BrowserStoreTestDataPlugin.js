export default class BrowserStoreTestDataPlugin {

    constructor (options) {
        this.options = options
    }

    apply (compiler) {
        console.log('BrowserStoreTestDataPlugin PLUGIN is loaded')
    }
}
