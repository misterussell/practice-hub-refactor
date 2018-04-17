# To install project
- npm install simple-react-app
- npm install --save-dev babel-polyfill
- add babel-polyfill to package.json dependencies (not devDependencies)
- npm install --save-dev mobx mobx-react babel-preset-mobx
  - babel-preset-mobx will include the necessary plugins.
  - I was unable to use it as a preset
  - add the following plugins to .babelrc to allow for decorator use:
```
"transform-decorators-legacy",
"transform-class-properties",
"transform-es2015-classes",
"transform-regenerator",
"react-hot-loader/babel",
"babel-plugin-transform-object-rest-spread"
```
- [How to handle refresh failure with webpack](https://tylermcginnis.com/react-router-cannot-get-url-refresh/)
