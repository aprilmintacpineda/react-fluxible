const alias = require('./importAliases');

module.exports = {
  presets: ['@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-react-jsx',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias
      }
    ]
  ]
};
