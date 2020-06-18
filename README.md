# Node Server Testing Guided Project

Guided project for **Node Server Testing** Module.

## Project Setup

- [x] fork and clone this repository.
- [x] **CD into the folder** where you cloned **your fork**.
- [x] type `npm i` to download dependencies.
- [x] type `npm run server` to start the API.

Please follow along as the instructor adds automated tests to the API.

## Everything is a Function!

```javascript
function greet(name) {
  return "hello " + name;
}
```

- functions() are invoked!
- make requests to `endpoint(request.body|headers|params|query)`;
- render `component(props)` -> display UI

## What to Test?

- http status code
  - check data sent vs expected code
  - you should always return a correct status code
- data in the body
  - make sure it's json
