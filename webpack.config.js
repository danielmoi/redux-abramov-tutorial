module.exports = {
  entry: [
    './js/index.js'
  ],
  output: {
    path: './dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  },
  devServer: {
    port: 5000,
    historyApiFallback: true
  },
  devtool: 'source-map',

  watch: true
};
