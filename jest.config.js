const tsConfig = require('./tsconfig.jest.json');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', tsConfig]
  }
};
