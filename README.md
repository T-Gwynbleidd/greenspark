# greenspark code task
This project was setup using vue create, options selected for Vue3, dart-sass, babel, Typescript, Vuex, eslint and unit-jest. Minimal other modules were installed, except to allow for inline svg files, and to address some TDD issues I came across.

It was my first time building a Vue3 app, using Vuex. As well as my first time coding with Typescript and approaching it using TDD with Jest.
I had done some learning on both Typescript and TDD before hearing from Greenspark and being presented with this code task, so it seemed like the perfect opportunity to put them into practice, and to challenge myself to apply them to Vue3/Vuex inline with your tech stack.

As such, I hope that you forgive any sub-optimal configuration that you find in this code repo.

I started with TDD (productWdiget.spec.ts) for the ProductWidget component (ProductWidget.vue), you can see how I built up the component by following the order of the tests.
Once I had the component working with props and all tests were passing, I then mounted it within the App.vue component and started on the test for that (app.spec.ts).

This is where I had to figure out the Vuex store, and stopped approaching it from TDD.
I used the [docs](https://vuex.vuejs.org/) to try and set this up in the cleanest way, that would also allow for Typescript.
Once I had the app compiling without issues, pulling data from the API, and mutating the state through dispatched actions as expected, I then went back to the app.spec.ts file to add some tests to check that the store was interacting as desired.

Once I had all of the functionality in place, the code tidy and the tests passing I styled the component.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```
The app can be seen and interacted with through your [browser](http://localhost:8080/)
### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test
```
This runs all test files, to test a specific file run the below command instead, amending the value of "[filename]"
```
yarn test --testPathPattern=[filename]
```

### Lints and fixes files
```
yarn lint
```
