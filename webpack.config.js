var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname.concat('/dist'),
  },

  // allows us to see sourcemap of the js at webpack://
  // only for dev - use just 'source-map' for prod, which creates a .map file
  // that will be loaded by the browser only when devtools is opened
  devtool: 'source-map',

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/,
        loader: [
          'style-loader',
          'css-loader?modules&sourceMap',
          'postcss-loader',
          'sass-loader?sourceMap',
        ],
        exclude: /node_modules/,
      },
      // add the 'url-loader' module to pack assets into the bundle as well:
      // { test: /\.(png|jpg|svg|gif)$/, loader: 'url', exclude: /node_modules/ },
    ],
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
};
