const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge: mergeWebpack } = require("webpack-merge")
const path = require("path");

const envWebpackConfig = (env) => require(`./webpack.${env.mode}`)(env)

const resolvePath = (pathString) => path.resolve(__dirname, pathString)

module.exports = (env) => mergeWebpack({
  mode: env.mode,
  entry: "./src/index.ts",
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.jsx' ],
  },
  plugins: [
    new ReactRefreshPlugin(),
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            [
              '@babel/preset-env',
              {
                corejs: 3,
                modules: false,
                useBuiltIns: 'usage',
              },
            ],
            '@babel/preset-typescript',
          ],
          plugins: [
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-export-default-from',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            '@babel/plugin-proposal-optional-chaining',
            ...(env.mode === 'development' ? ['react-refresh/babel'] : []),
          ],
        },
      },
      
    ],
  },
  devServer: {
    contentBase: resolvePath("build"),
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    hotOnly: false,
    compress: true,
    open: true,
    port: "4040",
  },
}, 
envWebpackConfig(env)
);
