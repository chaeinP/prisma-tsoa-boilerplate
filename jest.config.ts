import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  testMatch: ['**/**.*spec.ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true }],
  },
  collectCoverageFrom: ['src/**'],
};

export default config;
