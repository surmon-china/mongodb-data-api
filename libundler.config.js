/** @type {import('@surmon-china/libundler/lib/interface').LibundlerConfigObject} */
module.exports = {
  libName: 'MongoDBDataAPI',
  outFileName: 'mongodb-data-api',
  targets: ['cjs', 'esm'],
  entry: './src/index.ts',
  outDir: './dist',
  external: ['axios', 'mongodb'],
  minimize: false,
  sourcemap: false
}
