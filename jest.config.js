// import nextJest from 'next/jest'
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  rootDir: '.',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',

  modulePaths: ['src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/',
  },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// export default createJestConfig(config)
module.exports = createJestConfig(config)
