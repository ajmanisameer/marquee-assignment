const webpack = require('webpack')
// config-overrides.js
module.exports = function override(config, env) {
  // New config, e.g. config.plugins.push...
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      process: 'process/browser',
    },
    extensions: ['.ts', '.js', '.tsx'],
    // fallback: {
    //   // ...config.resolve.fallback,
    //   stream: require.resolve('stream-browserify'),
    //   buffer: require.resolve('buffer'),
    // },
  };
  

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  );
  return config
}