module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-navigation|react-native|@react-native)',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
