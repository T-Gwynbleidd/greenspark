module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transformIgnorePatterns: ['/node_modules/(?!vue-svg-inline-plugin)'],
  transform: {
    '^.+\\.vue$': './vue3JestHack.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
