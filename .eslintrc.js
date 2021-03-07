module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-use-before-define': ['warn', { functions: true, classes: true }],
  },
};
