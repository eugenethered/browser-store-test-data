import { PLUGIN_NAME } from '../constants'

class BrowserLogger {
    debug = true

    style = {
        baseStyle: `
            padding: 2px 5px;
            color: #000; 
        `,
        testContextStyle: `
            padding: 2px 5px;
            background-color: #86ff86;
            color: #000; 
        `,
        colors: {
            log: '#ffffe0'
        }
    }

    log = (message) => {
        if(!this.debug) return
        this.useLog(message, 'TEST 💾')
    }

    useLog = (message, context) => {
        const style = this.style.baseStyle + `background-color: ${ this.style.colors.log }`
        console.log(`%c[${PLUGIN_NAME}]%c` + context, style, this.style.testContextStyle, message)
    }
}

export default BrowserLogger