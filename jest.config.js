module.exports = {
  preset: 'react-native',
  transform: {
    '\\.(svg)$': './__mocks__/svgMock.jsx',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-redux|react-native-svg|react-native-vector-icons)',
  ],
};
