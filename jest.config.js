module.exports = {
  verbose: true,
  bail: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/public/', '/bin/', '/config/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coverageDirectory: './coverage/',
  collectCoverage: true,
  rootDir: './',
};
