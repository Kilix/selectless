import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import inject from 'rollup-plugin-inject'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

const processShim = '\0process-shim'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

const targets = prod
  ? [{ dest: 'dist/react-selectless.min.js', format: 'umd' }]
  : [
      { dest: 'dist/react-selectless.js', format: 'umd' },
      { dest: 'dist/react-selectless.es.js', format: 'es' },
    ]

const plugins = [
  {
    resolveId(importee) {
      if (importee === processShim) return importee
      return null
    },
    load(id) {
      if (id === processShim) return 'export default { argv: [], env: {} }'
      return null
    },
  },
  nodeResolve(),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  inject({
    process: processShim,
  }),
  babel({
    babelrc: false,
    presets: ['react', ['latest', { es2015: { modules: false } }]],
    plugins: ['external-helpers', 'transform-object-rest-spread'],
  }),
  json(),
]

if (prod) plugins.push(uglify())

export default {
  entry: 'src/index.js',
  moduleName: 'react-selectless',
  exports: 'named',
  targets,
  plugins,
}
