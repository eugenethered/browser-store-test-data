import { TEST_DATA_LOAD_URI } from '../core/constants'
import TestDataBrowserDBProvider from './provider/TestDataBrowserDBProvider'

const provider = new TestDataBrowserDBProvider()
provider.initialize(TEST_DATA_LOAD_URI)
