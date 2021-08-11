module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testMatch: ['**/*.spec.ts'],
  roots: [
    '<rootDir>/test'
  ],
  transform: {
    '\\.ts$': 'ts-jest'
  },
  clearMocks: true,
  setupFiles: ['dotenv/config']
}
