import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/**.*spec.ts'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**'],
  globals: {
    'ts-jest': {
      isolatedModules: false,
    },
  },
};

export default config;
