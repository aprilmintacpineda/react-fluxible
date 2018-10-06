/** @format */

const babelCore = require('@babel/core');
const path = require('path');
const fs = require('fs');

const source = fs.readFileSync(path.join(__dirname, '/src/index.js'), 'utf8');
const code = babelCore.transform(source, {
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/proposal-class-properties']
}).code;
const codeMin = babelCore.transform(source, {
  babelrc: false,
  presets: ['@babel/preset-env', '@babel/preset-react', 'minify'],
  plugins: ['@babel/plugin-syntax-object-rest-spread', '@babel/proposal-class-properties']
}).code;

fs.writeFileSync(path.join(__dirname, '/lib/index.js'), code, 'utf8');
fs.writeFileSync(path.join(__dirname, '/lib/index.min.js'), codeMin, 'utf8');
fs.writeFileSync(path.join(__dirname, '/example/src/lib.js'), code, 'utf8');
