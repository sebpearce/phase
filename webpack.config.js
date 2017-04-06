module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },

  // allows us to see sourcemap of the js at webpack://
  // only for dev - use just 'source-map' for prod, which creates a .map file
  // that will be loaded by the browser only when devtools is opened
  devtool: 'eval-source-map',

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  }
};
