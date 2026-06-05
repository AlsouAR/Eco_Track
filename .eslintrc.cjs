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
  
  // parserOptions: дополнительные настройки парсера
  parserOptions: {
    ecmaVersion: "latest",  // последняя версия ECMAScript
    sourceType: "module",   // используем ES модули (import/export)
    ecmaFeatures: {
      jsx: true,            // поддерживаем JSX синтаксис
    },
  },
  
  // plugins: дополнительные наборы правил
  plugins: [
    "@typescript-eslint",   // правила для TypeScript
    "react",                // правила для React
    "import",               // правила для импортов
  ],
  
  // extends: готовые конфигурации (базовые наборы правил)
  extends: [
    "eslint:recommended",                      // базовые правила ESLint
    "plugin:react/recommended",                // лучшие практики React
    "plugin:@typescript-eslint/recommended",   // лучшие практики TypeScript
    "prettier"
  ],
  
  // settings: общие настройки для плагинов
  settings: {
    react: {
      version: "detect",    // автоматически определяет версию React
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"], // какие расширения проверять
      },
      typescript: {
        alwaysTryTypes: true,  // пытаться найти типы для импортов
      },
    },
  },
  
  // rules: индивидуальные правила (переопределяют extends)
  rules: {
    // ------ ПРАВИЛА КОДА ------
    
    // no-console: запрещает console.log, но разрешает console.warn и console.error
    "no-console": ["warn", { "allow": ["warn", "error"] }],
    
    // ------ ПРАВИЛА REACT ------
    
    // react/react-in-jsx-scope: не требует импорт React (для React 17+)
    "react/react-in-jsx-scope": "off",
    
    // react/prop-types: отключает проверку prop-types (используем TypeScript)
    "react/prop-types": "off",
    
    // react/self-closing-comp: требует самозакрывающиеся теги если нет детей
    "react/self-closing-comp": "error",
    
    // react/jsx-curly-brace-presence: убирает лишние фигурные скобки в JSX
    "react/jsx-curly-brace-presence": ["error", { "props": "never", "children": "never" }],
    
    // ------ ПРАВИЛА TYPESCRIPT ------
    
    // @typescript-eslint/no-unused-vars: предупреждение для неиспользуемых переменных
    // переменные с _ в начале игнорируются
    "@typescript-eslint/no-unused-vars": ["warn", { 
      "argsIgnorePattern": "^_",    // аргументы с _
      "varsIgnorePattern": "^_"     // переменные с _
    }],
    
    // @typescript-eslint/no-explicit-any: разрешает использование any (отключено)
    "@typescript-eslint/no-explicit-any": "off",
    
    // @typescript-eslint/consistent-type-imports: требует import type для типов
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    
    // ------ ПРАВИЛА ИМПОРТОВ ------
    
    // import/order: порядок импортов
    "import/order": ["error", {
      // groups: группы в порядке следования
      "groups": [
        "builtin",      // встроенные модули Node (fs, path)
        "external",     // внешние библиотеки (react, lodash)
        "internal",     // внутренние модули (алиасы @/)
        ["parent", "sibling"], // родительские и соседние модули (../, ./)
        "index",        // индексные файлы (./index)
        "type"          // импорты типов
      ],
      
      // pathGroups: специальные правила для определенных импортов
      "pathGroups": [
        {
          "pattern": "react",      // react всегда первым
          "group": "external",
          "position": "before"
        },
        {
          "pattern": "react-dom",  // react-dom вторым
          "group": "external",
          "position": "before"
        },
        {
          "pattern": "@/**",       // импорты с @/ (алиасы) после внешних
          "group": "internal",
          "position": "after"
        }
      ],
      
      // pathGroupsExcludedImportTypes: исключения для pathGroups
      "pathGroupsExcludedImportTypes": ["react", "react-dom"],
      
      // newlines-between: пустые строки между группами
      "newlines-between": "always",
      
      // alphabetize: сортировка по алфавиту внутри групп
      "alphabetize": {
        "order": "asc",           // по возрастанию (A-Z)
        "caseInsensitive": true   // без учета регистра
      }
    }],
    
    // import/newline-after-import: пустая строка после всех импортов
    "import/newline-after-import": "error",
    
    // import/no-duplicates: запрещает дублирование импортов
    "import/no-duplicates": "error"
  }
};