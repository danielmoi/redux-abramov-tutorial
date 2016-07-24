module.exports = {
  entry: [
    './js/_tute-1/vid-14b.js'
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
