var flow = require('rollup-plugin-flow');

import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'src/js/index.js',
  dest: 'build/js/index.min.js',
  format: 'cjs',
  sourceMap: 'inline',
  plugins: [ 
    flow(), 
    nodeResolve({
      jsnext: true
    }) 
  ]
}
