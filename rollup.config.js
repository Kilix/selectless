import nodeResolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import uglify from 'rollup-plugin-uglify'

const prod = process.env.PRODUCTION
const mode = prod ? 'production' : 'development'

console.log(`Creating ${mode} bundle...`)

const targets = prod
  ? [{dest: 'dist/react-selectless.min.js', format: 'umd'}]
  : [
      {dest: 'dist/react-selectless.js', format: 'umd'},
      {dest: 'dist/react-selectless.es.js', format: 'es'},
    ]

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(prod ? 'production' : 'development'),
  }),
  json(),
  nodeResolve({jsnext: true, main: true}),
  babel({
    babelrc: false,
    plugins: [
      'transform-export-extensions',
      'transform-class-properties',
      'syntax-object-rest-spread',
      'transform-object-rest-spread',
      'external-helpers',
    ],
    presets: ['react', ['latest', {es2015: {modules: false}}]],
  }),
  commonjs(),
]

if (prod) plugins.push(uglify())

export default {
  entry: 'src/index.js',
  moduleName: 'react-selectless',
  exports: 'named',
  external: ['react', 'react-dom', 'prop-types', 'recompose', 'ramda'],
  globals: {
    react: 'React',
    'react-dom': 'reactDom',
    'prop-types': 'PropTypes',
    ramda: 'ramda',
    recompose: 'recompose',
  },
  targets,
  plugins,
}
