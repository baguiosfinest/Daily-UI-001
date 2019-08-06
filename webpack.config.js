require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, "css-loader"
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [{
          loader: "style-loader"
        },{
          loader: "css-loader"
        },{
          loader: "sass-loader"
        }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        // Exclude the icons folder, because it has a seperate loader
        // exclude: path.resolve(__dirname, 'assets/dev/icons'),
        use: [
          {
            // Inline if file is smaller than 8Kb,
            // else output to dist/images folder
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: './images/[name].[ext]'
            }
          }, {
            // Optimize images
            loader: 'image-webpack-loader',
            options: { bypassOnDebug: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{
      from: 'images/**/**',
      to: path.resolve(__dirname, 'dist')
    }]),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      PORT: JSON.stringify(process.env.PORT)
    })
  ],
  devServer: {
    //contentBase: './src/index.html',
    port: 7700
  }
};