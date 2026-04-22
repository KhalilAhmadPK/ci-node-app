export default [
  {
    files: ["**/*.js"],

    ignores: ["node_modules/**", "coverage/**"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    rules: {
      "no-unused-vars": "error",
      "no-console": "off",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "single"],
      "indent": ["error", 2],
      "no-trailing-spaces": "error",
      "eol-last": "error",
    },
  },

  // Jest support
  {
    files: ["tests/**/*.js"],
    languageOptions: {
      globals: {
        describe: "readonly",
        test: "readonly",
        expect: "readonly",
      },
    },
  },
];