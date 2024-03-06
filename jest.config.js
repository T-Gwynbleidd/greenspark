module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': './vue3JestHack.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
