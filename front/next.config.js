const withSass = require('@zeit/next-sass')
module.exports = withSass({
  /* config options here */
})

// module.exports = {
//   entry: './src/index.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname, './dist'),
//     publicPath: 'dist/',
//   },
//   mode: 'none',
//   module: {
//     rules: [{
//       test: /\.(png|jpg)$/,
//       use: [
//         'file-loader'
//       ]
//     }]
//   }
// }
