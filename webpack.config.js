const path = require("path"); 
const HtmlWebpackPlugin = require("html-webpack-plugin"); 
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); 


const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/pages/index.js",
  output: {
    
    path: path.resolve(__dirname, "dist"), 
    filename: "main.js",
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.join(__dirname, "./"), 
    compress: true, 
    port: 8080, 

    open: true, 
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    
    new HtmlWebpackPlugin({
      template: "./src/index.html", 
    }),
    new CleanWebpackPlugin(), 
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
  devtool: "source-map",
};
