const path = require("path");

const resolvePath = (pathString) => path.resolve(__dirname, pathString);

module.exports = (env) => ({
  mode: "development",
  output: {
    path: resolvePath("build"),
    filename: "dev.bundle.js",
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        use: ["url-loader"],
      },
    ],
  },
});
