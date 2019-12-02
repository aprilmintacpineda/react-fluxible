/** @format */

const babelCore = require('@babel/core');
const path = require('path');
const fs = require('fs');

const src = path.join(__dirname, '/src');
const lib = path.join(__dirname, '/lib');
const exampleAsync = path.join(__dirname, '/example-async/src/lib');
const exampleSync = path.join(__dirname, '/example-sync/src/lib');

fs.readdirSync(src)
  .map(filename => {
    const source = fs.readFileSync(path.join(src, filename), 'utf8');

    return {
      filename: filename.split('.')[0],
      code: babelCore.transform(source, {
        babelrc: false,
        presets: [
          ['@babel/preset-env', {
            loose: true
          }],
          '@babel/preset-react'
        ],
        plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/proposal-class-properties']
      }).code,
      codeMin: babelCore.transform(source, {
        babelrc: false,
        comments: false,
        presets: [
          ['@babel/preset-env', {
            loose: true
          }],
          '@babel/preset-react',
          ['babel-preset-minify', {
            builtIns: false
          }]
        ],
        plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/proposal-class-properties']
      }).code
    };
  })
  .forEach(({ code, codeMin, filename }) => {
    fs.writeFileSync(path.join(lib, `${filename}.js`), code, 'utf8');
    fs.writeFileSync(path.join(lib, `${filename}.min.js`), codeMin, 'utf8');

    fs.writeFileSync(path.join(exampleAsync, `${filename}.js`), code, 'utf8');
    fs.writeFileSync(path.join(exampleSync, `${filename}.js`), code, 'utf8');
  });
