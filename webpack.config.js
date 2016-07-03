module.exports = {
  entry: [
    './js/todo-29.js'
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
