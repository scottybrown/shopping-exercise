var OFF = 'off',
    WARN = 'warn',
    ERROR = 'error';

module.exports = {
    parserOptions: {
        ecmaVersion: 6,
    },
    rules: {
        'no-unused-vars': ERROR,
        indent: [ERROR, 4],
        quotes: [ERROR, 'single'],
    },
};
