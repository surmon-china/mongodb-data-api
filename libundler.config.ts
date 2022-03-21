import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'MongoDBDataAPI',
  outFileName: 'mongodb-data-api',
  targets: ['cjs', 'esm'],
  entry: './src/index.ts',
  outDir: './dist',
  external: ['axios', 'mongodb'],
  terser: false,
  sourcemap: false
})
