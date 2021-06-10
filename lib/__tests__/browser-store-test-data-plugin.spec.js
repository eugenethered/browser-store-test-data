/* eslint-env jest */

import BrowserStoreTestDataPlugin from '../browser-store-test-data-plugin';

describe('Browser Store Test Data Plugin', () => {
  it('should initialize', () => {
    expect(new BrowserStoreTestDataPlugin()).toBeDefined();
  });

  it('should have test data path', () => {
    const options = { testDataPath: 'path/to/dir' };
    const plugin = new BrowserStoreTestDataPlugin(options);
    expect(plugin.options.testDataPath).toEqual('path/to/dir');
  });
});
