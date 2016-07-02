module.exports = {
  entry: [
    './js/todo-15.js'
  ],
  output: {
    path: './dist',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
