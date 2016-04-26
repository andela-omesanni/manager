var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './public/src/index.js'
  ],
  output: {
    path: __dirname + '/public/',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      include: __dirname
    },{
      test: /\.(css)$/,
      loader: 'style-loader!css-loader'
    },{ 
      test: /\.(png|jpg)$/, 
      loader: 'url-loader?limit=8192' 
    }]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public'
  }
};
