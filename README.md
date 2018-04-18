## Practice Hub v2

This is a refactored version of [this project](https://github.com/misterussell/practice-hub) that utilizes [simple-react-app](https://www.npmjs.com/package/simple-react-app) to bootstrap the project, rather than create-react-app.

###### Originally I used this project to:
- Practice vanilla JS with version control options
- Keep a log of relevant blog posts

###### Quickly this switched into a deep-dive of:
- React
- State management investigation
- Syntax exploration
- Node/Babel Package Management and implementation
- I expect it will also lead to learning Jest

#### Why create a "practice-hub" when you can just create distinct projects?
Because I don't want to have to keep bootstrapping things to get back to my config of choice!

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

# Tools
- simple-react-app
- mobx/mobx-react

# Resources
- [Best Practices for Stores](https://mobx.js.org/best/store.html)
- [Using intervals/Core API Docs](https://mobx.js.org/refguide/api.html)
- [How to handle refresh failure with webpack](https://tylermcginnis.com/react-router-cannot-get-url-refresh/)
