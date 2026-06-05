module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    ".env",
    ".vscode/",
    "coverage/",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.{ts,tsx}"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
        "@typescript-eslint/no-floating-promises": "error",
        "@typescript-eslint/strict-boolean-expressions": ["warn", {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
        }],
      },
    },
  ],
  rules: {
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "error",
    "eqeqeq": ["error", "always", { null: "ignore" }],
    curly: "error",
    semi: ["error", "always"],
    quotes: ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "comma-dangle": ["error", "always-multiline"],
    "object-curly-spacing": ["error", "always"],
    "array-bracket-spacing": ["error", "never"],
    "keyword-spacing": ["error", { before: true, after: true }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
  },
};
