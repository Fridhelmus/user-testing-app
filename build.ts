const esbuild = require('esbuild')
const cssModulesPlugin = require('esbuild-plugin-css-modules')
const sassPlugin = require('esbuild-sass-plugin')

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    bundle: true,
    outfile: 'dist/bundle.js',
    define: {
      'process.env.NODE_ENV': '"development"',
    },
    platform: 'node',
    loader: { '.ts': 'tsx' },
    plugins: [
      cssModulesPlugin({
        localIdentName: '[local]--[hash:8:md5:hex]',
      }),
      sassPlugin.default(),
    ],
  })
  .catch(e => console.error(e.message))
  