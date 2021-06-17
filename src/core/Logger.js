import chalk from 'chalk'

class Logger {

    constructor (externalLogger) {
        this.logger = externalLogger
    }

    log = (message) => this.useLog(message)

    useLog = (message) => {
        this.logger.log(chalk.yellow(message))
    }
}

export default Logger