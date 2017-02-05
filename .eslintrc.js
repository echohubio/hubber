module.exports = {
  extends: 'airbnb',
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'new-cap': ['error', { 'capIsNewExceptions': ['Debug', 'express.Router'] }],
    'max-len': ["error", { code: 160 }],
    'react/prop-types': 'off',
  },
  globals: {
    window: true,
    document: true,
  },
};
