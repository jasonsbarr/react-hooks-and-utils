# useHttpRequest

Declaratively render something for each state of an HTTP request cycle.

You can fire the request on a component's first render or use it in response to an event handler.

Uses Axios to make the actual request.

## Usage

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
// using an empty dependency array is VERY IMPORTANT to avoid infinite render loop
}, []); // eslint-disable-line <-- might need if using react-hooks/exhaustive-deps ESLint rule with autofix

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
        handleRequest({ url: "/posts?_limit=10" })
      }
    >
      Request
    </button>
  ),
  // After clicking the button:
  pending: pending => pending, //-> "Request has been fired; waiting for a response!"
  error: err => JSON.stringify(err), //-> If there's an error it will render this
  success: data => JSON.stringify(data) //-> If the response is good, this will render
});
```
