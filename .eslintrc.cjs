module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'airbnb',
        'airbnb-typescript'
    ],
    parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json']
    },
    ignorePatterns: [".eslintrc.cjs", "vite.config.ts"],
    parser: '@typescript-eslint/parser',
    plugins: ["react-refresh", "simple-import-sort"],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            {allowConstantExport: true},
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",
        'linebreak-style': 'off'
    },
}
