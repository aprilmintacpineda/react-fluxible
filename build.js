/** @format */

const babelCore = require('@babel/core');
const path = require('path');
const fs = require('fs');

const source = fs.readFileSync(path.join(__dirname, '/src/index.js'), 'utf8');
const code = babelCore.transform(source, {
  babelrc: false,
  presets: [
    ['@babel/preset-env', {
      loose: true
    }],
    '@babel/preset-react'
  ],
  plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/proposal-class-properties']
}).code;
const codeMin = babelCore.transform(source, {
  babelrc: false,
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
}).code;

fs.writeFileSync(path.join(__dirname, '/lib/index.js'), code, 'utf8');
fs.writeFileSync(path.join(__dirname, '/lib/index.min.js'), codeMin, 'utf8');
fs.writeFileSync(path.join(__dirname, '/example-async/src/lib.js'), code, 'utf8');
fs.writeFileSync(path.join(__dirname, '/example-sync/src/lib.js'), code, 'utf8');
