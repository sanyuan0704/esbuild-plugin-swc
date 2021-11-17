const esbuild = require('esbuild');
const { swcPlugin } = require('../dist/index');
esbuild.build({
  entryPoints: ['./index.tsx'],
  bundle: false,
  outdir: 'out',
  plugins: [
    swcPlugin()
  ]
})