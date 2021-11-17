# esbuild-plugin-swc

Plugin for esbuild to support tranforming js(x)/ts(x) with swc.

## Install
```js
// if using npm
npm i -D esbuild-plugin-swc
// if using yarn
yarn add -D esbuild-plugin-swc
// if using pnpm
pnpm i -D esbuild-plugin-swc
```

## Usage example
```js
const esbuild = require('esbuild');
const { swcPlugin } = require('esbuild-plugin-swc');
esbuild.build({
  entryPoints: ['./index.tsx'],
  bundle: false,
  outdir: 'out',
  plugins: [
    swcPlugin()
  ]
})
```

## Options
When instantiating plugin you can pass an objects with options. This object has SWC official `Compilation` type, see detail in [Compilation](https://swc.rs/docs/configuration/compilation)。

