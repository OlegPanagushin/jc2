module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: "eslint:recommended",
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error"
  }
};
