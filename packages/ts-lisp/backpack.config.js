/* eslint-disable @typescript-eslint/no-var-requires */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts']

    config.resolve = {
      extensions: ['.ts', '.js', '.json']
    }

    config.module.rules.push({
      test: /\.ts?$/,
      loader: 'ts-loader',
      options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true
      }
    })

    config.module.rules.unshift({
      enforce: 'pre',
      test: /\.ts$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    })

    config.plugins.push(new ForkTsCheckerWebpackPlugin())

    return config
  }
}
