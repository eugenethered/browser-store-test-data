const path = require('path')

module.exports = {
    mode: 'production',
    entry: {
        loader: './src/loader/index.js'
    },
    output: {
        clean: true,
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist/loader')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
}