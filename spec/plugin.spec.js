/* eslint-env jest */

import BrowserStoreTestDataPlugin from '../src/plugin/BrowserStoreTestDataPlugin.js'

describe('Browser Store Test Data Plugin', () => {
    it('should initialize with plugin default test-loader file', () => {
        const plugin = new BrowserStoreTestDataPlugin()
        expect(plugin.testLoaderFile).toBe('test-loader.js')
    })
})