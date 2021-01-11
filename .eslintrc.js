module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    // parserOptions: {
    //     ecmaFeatures: {
    //         jsx: true,
    //     },
    //     ecmaVersion: 2018,
    //     sourceType: 'module',
    // },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'prettier/@typescript-eslint'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    },
};
