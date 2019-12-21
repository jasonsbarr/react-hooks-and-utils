# useLocalStorage

Manages a value in localStorage for a key you define.

## Usage

```js
import { useLocalStorage } from "@jasonsbarr/custom-hooks";

// The key for the localStorage item
const key = "key";

// This will be saved as the value for key
// if there isn't already a value for it
const default = { value: "I ❤ React!" };

// Returns an array of the value and a function to set the value.
//
// If there's already a key/value pair matching the key,
// its value will be returned as the first array item.
// Otherwise the default will be stored and returned.
const [value, setValue] = useLocalStorage(key, default);

// ...
// Set value to something different
setValue({ value: "I STILL ❤ React!" });
```
