import rollupBabel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'

const minify = process.env.MINIFY
const format = process.env.FORMAT
const esm = format === 'es'
const umd = format === 'umd'
const cjs = format === 'cjs'

let targets

if (esm) {
  targets = [{dest: `dist/selectless.es.js`, format: 'es'}]
} else if (umd) {
  if (minify) {
    targets = [{dest: `dist/selectless.umd.min.js`, format: 'umd'}]
  } else {
    targets = [{dest: `dist/selectless.umd.js`, format: 'umd'}]
  }
} else if (cjs) {
  targets = [{dest: `dist/selectless.cjs.js`, format: 'cjs'}]
} else if (format) {
  throw new Error(`invalid format specified: "${format}".`)
} else {
  throw new Error('no format specified. --environment FORMAT:xxx')
}

const umdEntry = 'src/umd-entry.js'
const esmEntry = 'src/index.js'
// eslint-disable-next-line no-nested-ternary
const exports = !esm ? 'default' : 'named'

export default {
  entry: esm ? esmEntry : umdEntry,
  targets,
  exports,
  moduleName: 'selectless',
  format,
  external: ['react', 'react-dom', 'prop-types', 'recompose', 'ramda'],
  globals: {
    react: 'React',
    'react-dom': 'reactDom',
    'prop-types': 'PropTypes',
    ramda: 'ramda',
    recompose: 'recompose',
  },
  plugins: [
    umd
      ? replace({
          'process.env.NODE_ENV': JSON.stringify(minify ? 'production' : 'development'),
        })
      : null,
    nodeResolve({jsnext: true, main: true}),
    commonjs({include: 'node_modules/**'}),
    json(),
    rollupBabel({
      exclude: 'node_modules/**',
      babelrc: false,
      presets: [['env', {modules: false}], 'stage-2', 'react'],
      plugins: ['external-helpers'],
    }),
    minify ? uglify() : null,
  ].filter(Boolean),
}

// this is not transpiled
/*
  eslint
  max-len: 0,
  comma-dangle: [
    2,
    {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      functions: 'never'
    }
  ]
 */
