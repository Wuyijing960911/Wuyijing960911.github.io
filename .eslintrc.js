module.exports = {
    'extends': 'google',
    'parserOptions': {
        'ecmaVersion': 6,
    },

    'rules': {

        // https://eslint.org/docs/rules/array-bracket-spacing
        'array-bracket-spacing': ['error', 'never'],

        // Use the one true brace style
        'brace-style': ['error', '1tbs'],

        // Enforce using camelCase
        'camelcase': ['error', {'properties': 'always'}],

        'no-console': ['warn'],
        'no-debugger': ['warn'],

        // Indent at 4 spaces
        'indent': ['error', 4],

        // No trailing spaces in code
        'no-trailing-spaces': ['error'],

        // Don't use semicolons at the end of your statements
        'semi': ['error', 'never'],
    },
}