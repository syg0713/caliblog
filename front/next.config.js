const withSass = require('@zeit/next-sass') // SCSS
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer'); // for 트리쉐이킹
const CompressionPlugin = require('compression-webpack-plugin'); // gz 압축(배포용)

module.exports = withSass(withBundleAnalyzer({
  distDir: '.next',
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack( config ) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [
      ...config.plugins,
      // prod && new CompressionPlugin(), // main.js.gz
    ];
    if ( prod ) {
      plugins.push( new CompressionPlugin()); // main.js.gz
    }
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
}));
