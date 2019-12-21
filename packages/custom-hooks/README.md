# React Custom Hooks

Custom React hooks to handle side effects, interact with browser APIs, and more.

## Installation

```
npm install @jasonsbarr/custom-hooks
```

## Usage

### useLocalStorage

```js
import { useLocalStorage } from "@jasonsbarr/custom-hooks";

// The key for the localStorage item
const key = "value";

// This will be saved as the value for key
// if there isn't already a value for it
const default = {value: "I ❤ React!"};

// If there's already a key/value pair matching the key,
// its value will be returned as the first array item.
// Otherwise the default will be stored and returned.
const [value, setValue] = useLocalStorage(key, default);

// ...
// Set value to something different
setValue({value: "I STILL ❤ React!"});
```

### useHttpRequest

Declaratively render something for each state of an HTTP request cycle. Uses Axios behind the scenes.

You can fire the request on a component's first render or use it in response to an event handler.

```js
import React, { useEffect } from "react";
import { useHttpRequest } from "@jasonsbarr/custom-hooks";

// See https://github.com/axios/axios/#readme for all Axios config options
const config = {
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json"
  }
};
const initialState = "About to fire request";
const pendingState = "Request has been fired; waiting for a response!";

// Returns render function and function to fire request
const [render, handleRequest] = useHttpRequest({
  config,
  initialState,
  pendingState
});

// Call request from inside useEffect on initial page render
useEffect(() => {
  handleRequest({
    url: "/posts?_limit=10"
  })
// using an empty dependency array is VERY IMPORTANT
}, []); // eslint-disable-line <-- might need if using rules-of-hooks ESLint rule with autofix

// Each render state takes a callback function
return render({
  initial: initial => initial, //-> "About to fire request"
  pending: pending => pending, //-> "Request has been fired; waiting for a response!"
  error: err => JSON.stringify(err), //-> If there's an error it will render this
  success: data => JSON.stringify(data) //-> If the response is good, this will render
});
```

You can also fire the request from an event handler:

```js
// ... imports

const [render, handleRequest] = useHttpRequest({
  config,
  initialState,
  pendingState
});

return render({
  // Request will fire when this button is clicked
  initial: () => (
    <button
      onClick={() =>
        handleRequest("/posts?_limit=10", {
          conf: { method: "get" },
        })
      }
    >
      Request
    </button>
  ),
  pending: pending => pending, //-> "Request has been fired; waiting for a response!"
  error: err => JSON.stringify(err), //-> If there's an error it will render this
  success: data => JSON.stringify(data) //-> If the response is good, this will render
});
```
