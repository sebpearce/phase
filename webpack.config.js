module.exports = {
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname,
  },

  module: {
    loaders: [
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}
    ]
  }
};
