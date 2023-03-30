const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

const sdkPath = path.resolve(
__dirname,
"node_modules/@pattern-x/gemini-viewer-threejs/dist"
);

module.exports = {
  webpack: function (config, env) {
    let demoDistPath = path.resolve(__dirname, "public/demo/libs");
    if (env === 'production') {
         demoDistPath = path.resolve(__dirname, "build/demo/libs");
    }
    //do stuff with the webpack config...
    config.optimization.minimizer[0].options.extractComments = false;
    config.plugins.push(
      new CopyPlugin({
        patterns: [{ force: true, from: sdkPath, to: demoDistPath }],
      })
    );
    return config;
  },
  devServer: function(configFunction) {
    return function(proxy, allowedHost) {
        const config = configFunction(proxy, allowedHost);
        config.devMiddleware.writeToDisk = true;
        return config;
      };
  }
};
