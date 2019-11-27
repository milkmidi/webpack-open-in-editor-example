﻿const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const launchEditorMiddleware = require('launch-editor-middleware');

module.exports = (env, argv) => {
  const DEV_MODE = argv.mode === 'development';
  console.log(`mode:${argv.mode}`);

  const config = {
    context: path.resolve('src'),
    entry: {
      app: './app.js',
    },
    devtool: DEV_MODE ? 'inline-source-map' : false,
    output: {
      path: path.resolve('dist'),
      filename: DEV_MODE ? '[name].js' : '[name].[chunkhash].js',
    },
    resolve: {
      modules: [
        path.resolve('src'),
        path.resolve('node_modules'), // 這個不能刪喔, 啾咪
      ],
      alias: {
        '@': path.resolve('src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            { loader: 'babel-loader' },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          use: [
            { loader: 'vue-loader' },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.pug$/,
          oneOf: [
            {
              resourceQuery: /^\?vue/,
              use: [{
                loader: 'pug-plain-loader',
                options: {
                  data: {
                    DEV_MODE,
                  },
                },
              }],
            },
            {
              use: [
                {
                  loader: 'html-loader',
                },
                {
                  loader: 'pug-html-loader',
                  options: {
                    data: {
                      DEV_MODE,
                    },
                  },
                },
              ],
            },
          ],
          include: path.resolve('src'),
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[path][name].[ext]?[hash:7]',
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: 'html/index.pug',
        filename: 'index.html',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          DEV_MODE,
          // NODE_ENV: process.env
        },
      }),
    ],
    devServer: {
      before(app) {
        // 這裡有雷，在 PC 上，如果指定開啟為 vscode 的話
        // 會另開一個新的 vscode Editor, 而不是在本來的主 vscode 開啟
        // launchEditorMiddleware('code', 'src')
        app.use('/__open-in-editor', launchEditorMiddleware(null, 'src', () => console.log(
          'To specify an editor, specify the EDITOR env variable or '
          + 'add "editor" field to your Vue project config.\n',
        )));
      },
      overlay: {
        warnings: true,
        errors: true,
      },
      contentBase: './src',
      // publicPath: '/dist/',
      // stats: 'errors-only',
      stats: 'minimal',
      port: 3000,
      hot: true,
    },
  };
  return config;
};
