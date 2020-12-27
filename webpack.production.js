const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const resolvePath = (pathString) => path.resolve(__dirname, pathString)

module.exports = () => ({
  output: {
    path: resolvePath("build"),
    filename: "[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 7000,
              name: "[name].[ext]",
              outputPath: "img/",
            },
          },
        ],
      },
    ]
  },
  plugins: [new MiniCssExtractPlugin()]
});
