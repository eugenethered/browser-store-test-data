/* eslint-env jest */

import BrowserStoreTestDataPlugin from '../src/plugin/BrowserStoreTestDataPlugin'

describe('Browser Store Test Data Plugin', () => {
    it('should initialize with plugin specified name', () => {
        const plugin = new BrowserStoreTestDataPlugin()
        expect(plugin.name).toBe('browser-store-test-data-plugin')
    })
})