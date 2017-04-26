import path from 'path';
// import { dependencies as externals } from './app/package.json';

export default {
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'app'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },
  // plugins: [],
  externals: {
    architect: 'architect',
    'electron-devtools-installer': 'electron-devtools-installer',
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
