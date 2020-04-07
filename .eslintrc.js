module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  "extends": ["eslint:recommended","airbnb-base"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
  },

  "rules": {
    "semi": ["error","always"],
    "quotes": ["error","double"],
    "max-len": ["error",{
      "code": 150
    }],
    "no-param-reassign": [2,{ "props": false }],
    "no-undef": "off",
    "eqeqeq": "off",
    "no-use-before-define": "off",
    "default-case": "off",
  }
};
