export default {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  ignoreFiles: ['dist/**', 'node_modules/**'],
  rules: {
    'max-nesting-depth': 3,
    'selector-class-pattern':
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$',
    'order/properties-alphabetical-order': true,
  },
};
